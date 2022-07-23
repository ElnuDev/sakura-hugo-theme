function commentForm(parentId) {
	return `
	<form id="soudan-comment-form" onsubmit="submitForm(this, event)">
		<label for="author">Name:</label> <input type="text" name="author" placeholder="Anonymous">
		<label for="email">Email:</label> <input type="email" name="email">
		<label for="text">Comment:</label>
		<textarea name="text" required></textarea>
		<input type="hidden" name="parent"${parentId ? ` value=${parentId}` : ""}>
		<input type="submit">
	</form>`;
}
function commentDisplay(comment, replies) {
	return `<div id="${comment.id}" class="soudan-comment"><img class="soudan-avatar" src="https://www.gravatar.com/avatar/${comment.gravatar}"><div>${typeof replies === "string" ? `<button title="Reply" style="float: right; margin-left: 0.5em" onclick="this.disabled = true; reply(${comment.id})"><svg xmlns="http://www.w3.org/2000/svg" style="width: 20px" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></button>` : ""}<button title="Share" style="float: right" onclick="navigator.clipboard.writeText('${document.location.origin}${document.location.pathname}#${comment.id}'); alert('Copied comment share link to clipboard!')"><svg xmlns="http://www.w3.org/2000/svg" style="diplay: inline; width: 20px" viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg></button><b>${comment.author ? comment.author : "Anonymous"}</b> commented ${moment(new Date(comment.timestamp * 1000)).fromNow()}:<br><div>${md.render(comment.text)}</div>${typeof replies === "string" ? `<div class="soudan-replies">${replies ? replies : ""}</div>` : ""}</div></div>`;
}
const container = document.getElementById("soudan");
container.style.display = "none";
container.innerHTML = `<h3>Make a comment</h3>
${commentForm()}
<h3 id="soudan-comments-header">Comments</h3>
<div id="soudan-comments"></div>`;
const md = window.markdownit().disable("image");
const form = document.getElementById("soudan-comment-form");
const commentContainer = document.getElementById("soudan-comments");
const commentContainerHeader = document.getElementById("soudan-comments-header");
const contentId = document.querySelector("meta[name=\"soudan-content-id\"]").getAttribute("content");

function submitForm(form, e) {
	let data = {
		url: window.location.href,
		comment: { contentId }
	};
	new FormData(form).forEach((value, key) => {
		data.comment[key] = value === "" ? null : value;
	});
	if (data.comment.parent) {
		data.comment.parent = parseInt(data.comment.parent);
	}
	fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" }
	})
		.then(response => {
			if (!response.ok) {
				Promsise.reject();
			}
			form.querySelector("textarea").value = "";
			reloadComments();
		})
		.catch(error => alert("Something went wrong posting your comment!"))
	e.preventDefault();
}

function reloadComments(jump) {
	fetch(`${url}/${contentId}`)
		.then(response => {
			return response.json().then(json => {
				return response.ok ? json : Promise.reject(json);
			});
		})
		.then(comments => {
			let commentCount = comments.length;
			comments.forEach(comment => {
				if (comment.replies) {
					commentCount += comment.replies.length;
				}
			});
			commentContainerHeader.innerHTML = `${commentCount} Comment${commentCount == 1 ? "" : "s"}`;
			let html = "";
			if (comments.length == 0) {
				html = "<p>No comments yet! Be the first to make one.</p>";
			} else {
				comments.forEach(comment => {
					if (comment.replies) {
						let replies = "";
						comment.replies.forEach(reply => {
							replies += commentDisplay(reply);
						});
						html += commentDisplay(comment, replies);
					} else {
						html += commentDisplay(comment, "");
					}
				});
			}
			commentContainer.innerHTML = html;
			soudan.style.display = "";
			if (jump && window.location.hash) {
				const target = document.getElementById(window.location.hash.substring(1));
				if (target) {
					window.scrollTo(0, target.offsetTop);
					target.classList.add("soudan-highlighted");
				}
			}
		})
}

function reply(id) {
	const replies = document.getElementById(id).querySelector(".soudan-replies");
	replies.innerHTML = `<h3>Reply</h3>${commentForm(id)}${replies.innerHTML}`;
}

reloadComments(true);
