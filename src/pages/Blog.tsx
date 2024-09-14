import { MdEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import BlogForm from "../components/pages/blog/BlogForm";
import { useEffect, useState } from "react";
import useAuthStore from "../stores/AuthStore";
import { toast } from "react-toastify";
import NavigationManager from "../services/NavigationManager";
import { GetPosts, GetUserPosts } from "../services/BlogService";
import { FaArrowRight } from "react-icons/fa";
import { Checkbox } from "@chakra-ui/react";
import { FormControlLabel } from "@mui/material";
import GradientButton from "../components/helpers/GradientButton";

function Blog({ setTransition }: { setTransition: any }) {

    const user = useAuthStore((state: any) => state.user);
    const [showForm, setShowForm] = useState(false)
    const [posts, setPosts] = useState<Post[]>([]);
    const [showOnlyUserPosts, setShowOnlyUserPosts] = useState(false);

    useEffect(() => {
        GetPublishedPosts();
    }, [showOnlyUserPosts]);

    async function GetPublishedPosts() {
        if(showOnlyUserPosts)
        {
            const userPosts = await GetUserPosts(user);

            if(!userPosts) return;
            setPosts(userPosts.data);
            return;
        }
        
        const posts = await GetPosts();
        console.log(posts.data);
        if(!posts) return;

        setPosts(posts.data);
    }

    function handleBlogPost() {
        if(!user)
        {
            setTransition("animate");
            toast.success("Inicia sesión para poder publicar en el blog de la comunidad Vitalit!");

            setTimeout(() => {
                NavigationManager.navigateTo("/login", "/blog");
            }, 1000);
            return;
        }

        setShowForm(!showForm);
    }

    return (
        <div className="py-36 pb-10 px-10 sm:px-10 md:px-20">
            <div className="py-0 sm:py-10 min-h-[58vh]">
                <div className="flex justify-between items-center">
                    <h1>Blog Vitalit</h1>
                    <div onClick={() => handleBlogPost()} className="w-10 base-gradient h-10 rounded-full flex items-center justify-center cursor-pointer">
                        {showForm ? <IoMdClose className="text-white text-2xl"/> : <MdEdit className="text-white text-2xl"/>}
                    </div>
                </div>
                <div className={`${!showForm && "hidden"} py-10`}>
                    <BlogForm showForm={showForm} setShowForm={setShowForm} />
                </div>
                {user && <div className="ml-4 text-lg mt-10">
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                checked={showOnlyUserPosts}
                                onChange={() => setShowOnlyUserPosts(!showOnlyUserPosts)}
                                className="mr-5"
                            />
                        } 
                        label={"Mostrar solo mis publicaciones"} 
                    />
                </div>}
                <div>
                    <div className="flex flex-wrap py-10 gap-5 -mx-2">
                    {(posts && posts.length > 0) ?
                        posts.map((post, index) => (
                            <div 
                                key={index} 
                                className="transition-all cursor-pointer w-full lg:w-[calc(50%-10px)] shadow-2xl py-5 px-10 rounded-lg border border-gray-200"
                                onClick={() => NavigationManager.navigateTo(`/blog/post/${post.blog_id}`)}
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-purple-500 font-medium text-4xl">{post.blog_title}</h2>
                                </div>
                                <div className="py-5">
                                    <img className="w-full aspect-video" src={post.blog_image} alt="" />
                                </div>
                                <div className="flex justify-between items-center gap-5">
                                    <div className="flex gap-2">
                                        <div>
                                            <p>{new Date(post.blog_date).toLocaleDateString('en-GB')}</p>
                                            <p><strong>Publicado por:</strong> {post.blog_author_name}</p>
                                        </div>
                                    </div>
                                    <FaArrowRight className="text-purple-500 text-xl" />
                                </div>
                            </div>
                        )) : user && 
                        <div className="w-full flex flex-col items-center gap-10 border border-dashed border-purple-400 p-5">
                            <p className="text-center w-full">Aún no hay publicaciones en nuestro blog</p>
                            <GradientButton text="Haz tu primera publicación" onClick={() => handleBlogPost()} className="base-gradient mx-auto"/>
                        </div>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog