import style from "./AlertaSucesso.module.css";

export function AlertaSucesso({ mensagem }) {
  return (
    <div className={style.alerta}>
      <div className={style.emoji}>🐾</div>
      <div className={style.texto}>
        <h3>Boas-vindas de volta!</h3>
        <p>{mensagem || "Seus animaizinhos sentiram sua falta 💕"}</p>
      </div>
      <img
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXA1MGN3ZzhxZ28xNTIzZXU1OHpyeXlhcHp3ODI5dmRiOGZibDh5YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/QvgH33MpVAq2SC1pWX/giphy.gif"
        alt="Gif fofo de animal"
        width="140"
      />
    </div>
  );
}