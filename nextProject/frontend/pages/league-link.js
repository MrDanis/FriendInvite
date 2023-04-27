import styles from '../styles/Home.module.css'
import Head from 'next/head'
// import { useState, useEffect } from 'react' 
// import { usersRepo } from 'helpers/api';
import { useRouter } from 'next/router';

export default function LeagueLink() {
  const router = useRouter()
  const data = router?.query?.data;
  let test = data?JSON.parse(data):data;
  console.log('data getting after the league is select... ',test?.id);
  const handleCopyToClipboard = async() =>{
    if(test)
    {
        try {
            await navigator.clipboard.writeText(`http://localhost:3000/?data=${JSON.stringify(test)}`);
            alert('You can now share this link to your friends...');
            // router.push('/redirected-page')
          } catch (err) {
            console.error('Failed to copy text: ', err)
          }
    }
  }
  return (

    <div className="container">
      <Head>
        <title>Unreal Foods</title>
        <meta name="description" content="" />
        <link rel="icon" href="/micro.png" />
      </Head>

      <h3 className={styles.title}>
        Unreal Foods
      </h3>

      <h2 className={styles.description1}>
        an Unreal Foods reporter will text you at this number below:
      </h2>

      <p className={styles.description2}>
       {data?.id}
      </p>
       <div className='d-flex flex-column w-50 p-2 border border-2 border-danger shadow'>
          <h2 className='fw-bold'>
            Share this link to everyone in "Danasty League" to signup to unreal foods
          </h2>
          {
            test?
          <button style={{backgroundColor:'transparent'}} onClick={handleCopyToClipboard}>
            <p style={{color:'black',cursor:'pointer'}}>www.unrealfoods.com/{test?.id}/signup</p>
          </button>:null
          }
      </div>
     
{/*     onClick={()=>{router.push(`/?data=${data}`)}}  
      <form> */}
        
        {/* <button >Seach for {lastuser.sleeper_username} leagues</button>
        {
          leagues.map((leagues) => {
            return (
              <div key={leagues.name}>
                
                <button className={styles.leaguebutton} onClick={()=>{handleLeagueId(leagues)}}>{leagues.name} {leagues.season}</button>
              </div>
            )
          })
        } */}
      {/* </form> */}

    </div>
  );
}