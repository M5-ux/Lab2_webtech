import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
//import Auth from '../components/Auth'
import Account from '../components/Account'
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Auth } from '@supabase/auth-ui-react';



export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session)
        }

        setIsLoading(false)
      }
    }

    getInitialSession()

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      mounted = false

      subscription?.unsubscribe()
    }
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth 
        
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['github']}/>
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  )
}