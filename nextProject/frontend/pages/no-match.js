import styles from '../styles/Home.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { usersRepo } from 'helpers/api';


export default function noMatch() {
    let router= useRouter()

    function redirect(event) {
        event.preventDefault()
        router.push('/')
      }

    // const allusers = usersRepo.getAll()
    // const lastuser = allusers[allusers.length-1]
    // console.log(lastuser.username)


    return (
        <div className="container">
        <Head>
            <title>Unreal Foods</title>
            <meta name="description" content="" />
            <link rel="icon" href="/micro.png" />
        </Head>

        <p className={styles.description1}>
            Unreal Foods
        </p>

        <h2 className={styles.description1}>
            {/* We didn’t find a fantasy league on the Sleeper app with the username “{lastuser.username}”. */}
            We didn’t find a fantasy league on the Sleeper app this username
        </h2>

        <p className={styles.whitespace}>
        </p>

        <form>
            <button onClick={redirect}>Try a different username</button>
        </form>

        </div>
  )
}
