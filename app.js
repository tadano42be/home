document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('new-post-container');
    const postsList = document.getElementById('post-board');
    const searchBox = document.getElementById('search-box');
    const searchBtn = document.getElementById('search-btn');
    const showAllBtn = document.getElementById('show-all-btn');
    
    const fetchPosts = async () => {
        const response = await fetch('/posts');
        const posts = await response.json();
        postsList.innerHTML = posts.map(post => `
            <li>
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <button onclick="showPost('${post._id}')">View</button>
            </li>
        `).join('');
    };

    document.getElementById('create-post-btn').addEventListener('click', async () => {
        const title = document.getElementById('new-post-title').value;
        const tags = document.getElementById('new-post-tags').value.split(',');
        const content = document.getElementById('new-post-content').value;

        await fetch('/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, tags, content }),
        });

        fetchPosts();
    });

    window.showPost = async (id) => {
        const response = await fetch(`/posts/${id}`);
        const post = await response.json();
        const threadContainer = document.getElementById('thread-container');
        
        threadContainer.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <ul>
                ${post.comments.map(comment => `<li>${comment.content}</li>`).join('')}
            </ul>
            <form id="comment-form">
                <textarea id="new-comment-content" placeholder="Add a comment"></textarea>
                <button type="submit">Submit</button>
            </form>
        `;

        const commentForm = document.getElementById('comment-form');
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const content = document.getElementById('new-comment-content').value;

            await fetch(`/posts/${id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content }),
            });

            fetchPosts();
            showPost(id);
        });
    };

    searchBtn.addEventListener('click', async () => {
        const query = searchBox.value;
        const response = await fetch(`/posts?search=${query}`);
        const posts = await response.json();
        postsList.innerHTML = posts.map(post => `
            <li>
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <button onclick="showPost('${post._id}')">View</button>
            </li>
        `).join('');
    });

    showAllBtn.addEventListener('click', fetchPosts);

    fetchPosts();
});
