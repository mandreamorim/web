import db from "../../app/lib/db";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET": {
            return await get(req, res);
        }
        case "POST": {
            return await post(req, res);
        }
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

async function post(req, res) {
    const {nome, autor, ano, capa} = req.query;
    if (!nome || !autor || !ano || !capa) {
        return res.status(400).json({message: "Todos os campos são obrigatórios"});
    }
    let quantidade = getRandomArbitrary(10, 50)
    try {
        const [result] = await db.execute("INSERT INTO livros (nome, autor, ano, capa, quantidade) VALUES (?, ?, ?, ?, ?)", [nome, autor, ano, capa, quantidade]);
    } catch (e) {
        return res.status(409).json({
            error: e.error,
            message: e.message
        });
    }
    return res.status(201).json({
        message: "Livro criado com sucesso"
    });
}

async function get(req, res){
    const { id } = req.query;
    if (id) {
        const [rows] = await db.execute("SELECT * FROM livros WHERE id = ?", [id]);
        const livro = rows[0];
        if (!livro) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }
        return res.status(200).json(livro);
    } else {
        const [livros] = await db.execute("SELECT * FROM livros limit 30");
        return res.status(200).json(livros);
    }
}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}