import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="font-bold text-9xl">404</h1>
      <p>Página Não Encontrada</p>
      <p className="mt-1">Desculpe, a página que você está procurando não existe.</p>
      <Link
        to="/"
        className="bg-secondary hover:bg-secondary-hover text-white px-4 py-2 mt-5 rounded-full"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFoundPage;
