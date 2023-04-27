import styles from '../styles/Home.module.css'
import Head from 'next/head'
import { useState, useEffect } from 'react' 
import { usersRepo } from 'helpers/api';
import { useRouter } from 'next/router';
import axios from 'axios'
export default function Index() {
   
  const [leagues, setLeagues] = useState([])
  const router = useRouter()
// console.log(usersRepo.find(x => x.username === "inthesea"))
  const allusers = usersRepo.getAll()
  const lastuser = allusers[allusers.length-1]

  // ----------- Get League Names from Sleeper API

  const fetchLeaguesNames = async (event) => {
    // event.preventDefault()
    const leagues = await fetch('https://api.sleeper.app/v1/user/' + lastuser.sleeper_user_id + '/leagues/nfl/2023')
    const leaguesdata = await leagues.json()
    setLeagues(leaguesdata)
  }
   const handleLeagueId = async(league) => {
       console.log(league);
       const leagueData = {
        id:league.league_id,
        name:league.name,
        email:localStorage.getItem('email')
       }
       console.log(leagueData);
      let updatedUser = await axios.post('http://localhost:3001/user/assign-league',{leagueData});
       console.log('updated user is : ',updatedUser);
      //  usersRepo.update(lastuser,leagueData);
      if(updatedUser.status===200)
      {
        router.push(`/league-link?data=${JSON.stringify({id:league?.league_id,name:league?.name})}`);
      }  
   }
  useEffect(() => {
    fetchLeaguesNames()
  }, [lastuser])


  return (

    <div className="container">
      <Head>
        <title>Unreal Foods</title>
        <meta name="description" content="" />
        <link rel="icon" href="/micro.png" />
      </Head>

      <h1 className={styles.title}>
        Unreal Foods
      </h1>

      <p className={styles.description1}>
        Let’s go! We found 3 leagues with your username.
      </p>

      <p className={styles.description2}>
      we are only supporting dynasty format fantasy football on the Sleeper app. much more is coming soon. 
      </p>

      <p className={styles.whitespace}>
      </p>
{/*       
      <form> */}
        
        <button style={{width:'25%'}}>Seach for {lastuser.sleeper_username} leagues</button>
        {
          leagues.map((leagues) => {
            return (
              <div key={leagues.name}>
                
                <button className={styles.leaguebutton} onClick={()=>{handleLeagueId(leagues)}}>{leagues.name} {leagues.season}</button>
              </div>
            )
          })
        }
      {/* </form> */}

    </div>
  );
}