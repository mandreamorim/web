import db from "../../app/lib/db";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET": {
            return await get(req, res)
        }
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

async function get(req, res) {
    const { email, senha } = req.query;
    if (email && senha) {
        const [rows] = await db.execute("SELECT id FROM alunos WHERE email = ? and senha = ?", [email, senha]);
        const aluno = rows[0];
        if (!aluno) {
            return res.status(404).json({message: "Aluno não encontrado"});
        }
        return res.status(200).json(aluno);
    }
    return res.status(404).json();
}