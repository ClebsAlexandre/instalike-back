import 'dotenv/config';
import { ObjectId } from "mongodb"
import conectarAoBanco from "../dbconfig.js"
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)
// Conecta ao banco de dados utilizando a string de conexão obtida da variável de ambiente


export async function getTodosPosts() {
        const db = conexao.db("imersao-instabytes")
        // Obtém o banco de dados com o nome "imersao-instabytes"
        const colecao = db.collection("posts")
        // Obtém a coleção "posts" dentro do banco de dados
        return colecao.find().toArray()
        // Realiza uma consulta para encontrar todos os documentos na coleção e retorna um array com os resultados
    }

    export async function criarPost(novoPost) {
        const db = conexao.db("imersao-instabytes")
         const colecao = db.collection("posts")
        return colecao.insertOne(novoPost)

        
    }

    export async function atualizarPost(id, novoPost) {
        const db = conexao.db("imersao-instabytes");
         const colecao = db.collection("posts");
         const objID = ObjectId.createFromHexString(id)
        return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})

        
    }