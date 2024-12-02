import db from "../../app/lib/db";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET": {
            return await get(req, res)
        }
        case "POST": {
            return await post(req, res)
        }
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

async function get(req, res) {
    const { id_livro, id_aluno } = req.query;
    if (!id_livro && !id_aluno ) {
        return res.status(400).json({ message: "Campos insuficientes" });
    }
    if(id_livro){
        const [rows] = await db.execute("SELECT * FROM locacoes WHERE id_livro = ?", [id_livro]);
        return res.status(200).json(rows);
    }
    if(id_aluno){
        const [rows] = await db.execute("SELECT * FROM locacoes WHERE id_aluno = ?", [id_aluno]);
        return res.status(200).json(rows);
    }
    return res.status(404).json({ message: "..." });
}

async function post(req, res) {
    const { id_livro, id_aluno, data_init } = req.query;
    if (!id_livro || !id_aluno || !data_init) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }
    const dataInicio = new Date(data_init);

    const dataDevolucao = new Date(dataInicio);
    dataDevolucao.setDate(dataDevolucao.getDate() + 30);
    try{
        const [result] = await db.execute("INSERT INTO locacoes (id_livro, id_aluno, data_init, data_fin) VALUES (?, ?, ?, ?)", [id_livro, id_aluno, dataInicio, dataDevolucao]);
    } catch (e){
        return res.status(409).json({
            error: e.error,
            message: e.message});
    }
    return res.status(201).json({ message: "Created" });
}