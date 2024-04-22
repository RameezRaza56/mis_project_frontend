import { useRouter } from 'next/router'
const router = useRouter();
const data = router.query;
const CourseList = () =>{
    console.log("received data:\n", data);
}

export default CourseList