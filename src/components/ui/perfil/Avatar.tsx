interface Props {
  url: string;
  sizeTransformation?: string;
  size?: number;
}

export default function Avatar({
  url,
  sizeTransformation = "/upload/w_200,h_200,c_thumb,g_face/",
  size = 150,
}: Props) {
  const finalUrl =
    url?.replace("/upload/", sizeTransformation) || "/default-avatar.png";

  return (
    <div
      className="bg-slate-50 rounded-[3rem] p-3 border-2 border-slate-100 shadow-xl shadow-slate-100"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <img
        src={finalUrl}
        alt="Foto ID"
        className="w-full h-full object-cover rounded-[2.2rem]"
      />
    </div>
  );
}
