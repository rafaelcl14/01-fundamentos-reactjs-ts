import {Post,PostType} from './components/Post'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import styles from './App.module.css'
import './global.css'



const posts: PostType[] = [
  {
    id: 1,
    author:{
      avatar_Url:'https://avatars.githubusercontent.com/u/39815593?v=4',
      name: 'Rafael Carcalho Rosina',
      role:  'Analista de Banco de Dados'
    },
    
    content: [
    { type: 'paragraph', content: 'Fala galeraa 👋'},
    { type: 'paragraph', content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure repellat vitae officiis sit consequuntur eius et voluptatibus beatae vel repellendus, cum sunt molestias quibusdam reprehenderit voluptates accusantium libero aliquam consequatur?'},
    { type: 'link', content: '👉 jane.design/doctorcare'}        
    ],
    publishedAt: new Date('2023-05-03 20:00:00')
  },
  {
    id: 2,
    author:{
      avatar_Url:'https://avatars.githubusercontent.com/u/10428096?v=4',
      name: 'Alex Silva',
      role:  'Desenvolvedor'
    },
    content: [
    { type: 'paragraph', content: 'Fala galeraa 👋'},
    { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
    { type: 'link', content: '👉 jane.design/doctorcare'}        
    ],
    publishedAt: new Date('2023-05-10  20:00:00')
  },
]

export function App() {

  return (
    <div>
      <Header/>

      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          {posts.map(post => {
            return(
                <Post
                  key={post.id}
                  post={post}
                />
              )
          })}
        </main>
      </div>
    </div>
  
  )
}


