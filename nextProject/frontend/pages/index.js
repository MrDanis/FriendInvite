import { useEffect,useContext } from 'react'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from '../micro.png'
import axios from 'axios'

async function postData(d) {
  await fetch('/api/users/register', {
    body: JSON.stringify(d),
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
  })
}

export default function PageWithJSbasedForm() {
  let router= useRouter()
  const leagueLink = router.query;
  const params =router?.query?.data;
  let test = params&&params?JSON.parse(params):params;
  // const params = JSON.parse(router?.query?.data);
  console.log('Params are : ',test);
  const handleSubmit = async (event) => {
    
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    let data = {
      phone: event.target.phone.value, 
      email: event.target.email.value,
      sleeper_username: event.target.sleeper_username.value,
    }
    
    // Get user ID
    const user = await fetch('https://api.sleeper.app/v1/user/' + data.sleeper_username)
    const userdata = await user.json()
    

    // ---------------------------------------------------
    // USER TYPES ----------------------------------------
    // ---------------------------------------------------
    
    // 1. Users that don't have a Sleeper account
    if (Object.is(userdata, null)) {
      data = {
        phone: event.target.phone.value, 
        email: event.target.email.value,
        sleeper_username: event.target.sleeper_username.value,
        sleeper_user_id: ""
      }
      console.log("Users that don't have a Sleeper account")
      await postData(data)
      router.push('/no-match')
    } else {
      
      const leagues = await fetch('https://api.sleeper.app/v1/user/' + userdata.user_id + '/leagues/nfl/2022')
      const leaguesdata = await leagues.json()
      
      // 2. Users that have an account (userID) but have no Leagues
      if (leaguesdata.length == 0) {
        data = {
          phone: event.target.phone.value, 
          email: event.target.email.value,
          sleeper_username: event.target.sleeper_username.value,
          sleeper_user_id: userdata.user_id
        } 
        console.log("Users that have an account (userID) but have no Leagues")
        await postData(data)
        router.push('/no-match');
      } else {
        // flow change by danish start
        if(test)
        {
          // create the data for the user
          data = {
            phone: event.target.phone.value, 
            email: event.target.email.value,
            sleeper_username: event.target.sleeper_username.value,
            sleeper_user_id: userdata.user_id,
            league_id:test?.id,
            league_name:test?.name
          }
          // alert('user comming from the link is : ');
          console.log('User data is : ',data);
          // save the created user 
          let userRequest = await axios.post('http://localhost:3001/user/create-user',{data});
          // await postData(data)
          // redirect the user to the link share screen
          if(userRequest.status===200)
          {
            localStorage.setItem('email',userRequest?.data?.email);
            router.push(`/league-link?data=${JSON.stringify(test)}`);
          }
          // router.push(`/league-link?data=${JSON.stringify(test)}`);
          // // console.log('Data for the user two is : ',data) 
          // // alert('this will work for the user two case....');
          // router.push(`/league-link?data=${JSON.stringify(leagueLink)}`);
        }
        else{
          // 3. Users with User ID and Leagues
          // alert('some how if is not working')
          data = {
            phone: event.target.phone.value, 
            email: event.target.email.value,
            sleeper_username: event.target.sleeper_username.value,
            sleeper_user_id: userdata.user_id,
            number_leagues:0,
            dateCreated: new Date().toJSON(),
            dateUpdated: new Date().toJSON(),
            league_name:'',
            league_id:''
          } 
          console.log('User with id is : ',userdata,' and the data payload is : ',data);
           let userRequest = await axios.post('http://localhost:3001/user/create-user',{data});
           console.log('Response getting back from the backend is : ',userRequest);
          // await postData(data)
          if(userRequest.status===200)
          {
            localStorage.setItem('email',userRequest?.data?.email);
            router.push('/select-leagues');
          }
        }
        // flow change by danish end
      }
    }
  }
  return (
    <div className="container">
      <Head>
        <title>Unreal Foods</title>
        <meta name="description" content="Unreal Foods Welcome Page" />
        <link rel="icon" href="/micro.png" />
      </Head>

      <Image
          src={logo}
          alt="Apple emoji of a microphone"
          width={60}
          height={60}
        />
      
      <p className={styles.whitespace}>
      </p>

      <h1 className={styles.title}>
        Unreal Foods
      </h1>

      <p className={styles.description1}>
        a dedicated food taste for your dog
      </p>

      <p className={styles.whitespace}>
      </p>

      <p className={styles.description2}>
        add Unreal Foods to your phone for free 
      </p>
       {
        params?
      <h2 className={styles.whitespace}>
        Join {test?.name} League!
      </h2>:null
       } 

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" required />
        <label htmlFor="phone">Phone Number</label>
        <input type="text" id="phone" name="phone" required />
        <label htmlFor="sleeper_username">Sleeper User Name</label>
        <input type="text" id="sleeper_username" name="sleeper_username" required />

        <button type="submit" >Sign up</button>

      </form>
    </div>
  )
}
