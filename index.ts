// 1. Definimos la estructura del objeto
interface Post {
    userId: number;
    id?: number;
    title: string;
    body: string;
}

// 2. Clase para gestionar el CRUD
class PostService {



    private url = 'https://jsonplaceholder.typicode.com/posts';

    // GET - Obtener datos
    async getPosts(): Promise<Post[]> {
        const response = await fetch(this.url);
        return await response.json();
    }

    // POST - Crear un recurso
    async createPost(newPost: Post): Promise<Post> {
        const response = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        return await response.json();
    }

    // PUT - Actualizar un recurso
    async updatePost(id: number, updatedData: Post): Promise<Post> {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        return await response.json();
    }

    // DELETE - Eliminar un recurso
    async deletePost(id: number): Promise<void> {
        await fetch(`${this.url}/${id}`, { method: 'DELETE' });
        console.log(`Post con ID ${id} eliminado satisfactoriamente.`);
    }
}

// 3. Ejecución de prueba
const service = new PostService();

async function testCrud() {
    console.log("--- Probando CREATE ---");
    const created = await service.createPost({ userId: 1, title: 'Nuevo Post', body: 'Hola Mundo' });
    console.log(created);

    console.log("\n--- Probando DELETE ---");
    await service.deletePost(1);
}

testCrud();