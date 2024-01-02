'use client'
import TopBar from '@/components/TopBar/TopBar'
import WorkSpace from '@/components/Workspace/WorkSpace'
// import Problems, { problems } from '@/utils/Problems'
import React from 'react'

export default function page({ params }) {
    return (
        <div>
            <TopBar problemPage={true} params={params}/>
            <WorkSpace problemType={params.pid} />
        </div>
    )
}


// fetch static page
// SSG --> static site generation

// export async function getStaticPaths(){
//     const paths = Object.keys(problems).map((key)=>({
//         params: {pid:key}
//     }))

//     return{
//         paths: paths,
//         fallback: false
//     }
// }

// export async function getStaticProps({params}){
//     const {pid} = params;
//     const problem = problems[pid];

//     if(!problem){
//         return {
//             notFound: true
//         }
//     }else{
//         return {
//             props:{
//                 problem
//             }
//         }
//     }
// }