const wikiUrl = process.env.wikiUrl;
const todoUrl = process.env.todoUrl;
async function getWikiUrl() {
  const response = await fetch(wikiUrl);
  if (response.status != '200') {
    throw new Error(`Wikipedia responded with ${response.status}`);
  }
  return response.url;
}
async function postTodoUrl() {
  const readingUrl = await getWikiUrl();
  if (!readingUrl) {
    throw new Error('readingUrl error');
  }
  const TodoTask = {
    task: `read ${readingUrl}`,
  };
  await fetch(todoUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(TodoTask),
  });
}

postTodoUrl().catch((err) => {
  console.error('get wiki url job failed', err);
  process.exit = 1;
});
