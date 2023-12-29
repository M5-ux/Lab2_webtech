import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';

export default function About() {
  const { isDarkMode } = useTheme();
  const bgColor = isDarkMode ? 'bg-dark-background' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-700';

  const teamMembers = [
    {
      name: 'Jonathan VÉLIN',
      role: 'Co-Fondateur & CEO',
      description: "Passionné par le voyage et l'innovation.",
      imageUrl: '/jonathan.png',
    },
    {
      name: 'Omar LAHBABI',
      role: 'Co-Fondateur & Directeur Marketing',
      description: 'Expert en marketing digital et communication.',
      imageUrl: '/omar.png',
    },
    {
      name: 'Mathias NERIS',
      role: 'Co-Fondateur & Responsable des Opérations',
      description: 'Gère les opérations quotidiennes et la logistique.',
      imageUrl: '/mathias.png',
    },
  ];

  return (
    <section className={bgColor + ' py-20'}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 text-left px-6 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-4 text-customBlueGreen">
              À Propos de SoleyEvazyon
            </h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Le nom &quot;SoleyEvazyon&quot; est l&apos;ecriture en créole
              guadeloupéen et martiniquais de &quot;Soleil Evasion&quot;.
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Fondée en 2023, SoleyEvazyon est une agence de voyage dédiée à
              offrir des expériences inoubliables. Notre passion pour
              l&apos;aventure et la découverte nous pousse à créer des voyages
              uniques et sur mesure pour nos clients. Nous avons ausi souhaité
              faire un clin d&apos;oeil à nos pays d&apos;origines
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Notre équipe, composée de professionnels du voyage, travaille sans
              relâche pour vous apporter les meilleures destinations et
              activités, en mettant l&apos;accent sur l&apos;authenticité et le
              respect de l&apos;environnement.
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Rejoignez-nous pour explorer le monde d&apos;une manière que vous
              n&apos;oublierez jamais.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-6">
            <Image
              className="rounded-lg shadow-xl"
              src="/Logo1.png"
              width={960}
              height={266}
              alt="À Propos de SoleyEvazyon"
            />
          </div>
        </div>
        <section className="py-20">
          <h2 className="text-3xl font-bold mb-4 text-customBlueGreen">
            Rencontrez Notre Équipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={3024}
                  height={4032}
                  className="w-48 h-48 mx-auto rounded-full object-cover mb-4"
                />
                <h3
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {member.name}
                </h3>
                <p className="text-customBlueGreen font-semibold">
                  {member.role}
                </p>
                <p className={textColor + ' mt-2'}>{member.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
