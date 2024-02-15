import React from "react";
import { useParams } from "react-router-dom";

export default function DashboardAdminConfigSuccess() {
  const { client } = useParams();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    exchangeAuthorizationCodeForToken(code);
  }, [location.search]);

  const exchangeAuthorizationCodeForToken = async (code) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/mercadopago-authorization/success`,
        { code, path }
      );
      console.log("respuesta del back: ", data);
    } catch (error) {
      console.error("Error:", error.request);
    }
  };

  return (
    <div>
      <h1>Su cuenta ha sido conectada correctamente!</h1>
      <h2>¡Gracias por confiar en Charlie!</h2>
      <button>Finalizar Conexión</button>
    </div>
  );
}
