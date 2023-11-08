import Link from 'next/link';

export default function About() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">À Propos de Nous</h1>
      <p className="mb-4">
        Bienvenue sur notre site web ! Nous sommes une équipe passionnée qui se
        consacre à fournir du contenu informatif et engageant dans divers
        domaines. Notre objectif est de vous tenir informé, inspiré et éduqué.
      </p>

      <p className="mb-4">
        Notre site couvre un large éventail de sujets, allant de la technologie
        à la science, de la culture à la créativité. Que vous soyez un amateur
        curieux ou un expert chevronné, nous avons quelque chose à vous offrir.
      </p>

      <p className="mb-4">
        Explorez nos articles, découvrez de nouvelles idées, partagez vos
        commentaires et rejoignez notre communauté. Nous sommes ravis de vous
        avoir ici !
      </p>

      <div className="mb-4 space-y-2">
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Retour à l&aposAccueil
          </button>
        </Link>
      </div>

      <p className="mt-4">&copy; 2023 Notre Site Web</p>
    </div>
  );
}
