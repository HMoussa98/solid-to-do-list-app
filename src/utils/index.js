import {
  createSolidDataset,
  getSolidDataset,
  saveSolidDatasetAt,
  createContainerAt
} from "@inrupt/solid-client";

export async function getOrCreateTodoList(containerUri, fetch) {
  // First, try to create the container if it doesn't exist
  try {
    await createContainerAt(containerUri, { fetch });
  } catch (error) {
    // Container might already exist, that's fine
    console.log("Container may already exist:", error);
  }

  const indexUrl = `${containerUri}index.ttl`;
  
  try {
    const todoList = await getSolidDataset(indexUrl, { fetch });
    return todoList;
  } catch (error) {
    if (error.statusCode === 404) {
      console.log("Creating new todo list at:", indexUrl);
      const todoList = await saveSolidDatasetAt(
        indexUrl,
        createSolidDataset(),
        { fetch }
      );
      return todoList;
    }
    throw error; // Re-throw other errors
  }
}