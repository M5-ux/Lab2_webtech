import { useEffect, useState } from 'react';

function Header() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Appel à l'API pour obtenir les informations du profil
        fetch('/api/profile')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Problème lors de la récupération du profil.');
            })
            .then(data => {
                setProfile(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {/* Autres éléments de l'en-tête */}
            {profile && (
                <div>
                    <span>👤</span> {}
                    <span>{profile.username}</span>
                </div>
            )}
        </div>
    );
}

export default Header;
