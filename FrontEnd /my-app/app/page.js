import styles from './styles.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Bienvenue sur ma page d'accueil Next.js !</h1>
      <p>C'est ma première page avec Next.js.</p>
      <Link href="/about">
        <button className='custom-button'>À Propos</button>
      </Link>
      <Link href="/contacts">
        <button className='custom-button'>Contact</button>
      </Link>
      <Link href="/articles">
        <button  className='custom-button'>Liste d'articles</button>
      </Link>
      <footer className={styles.footer}>
        <p>&copy; 2023 Ma Page d'Accueil Next.js</p>
      </footer>
    </div>
  );
}
