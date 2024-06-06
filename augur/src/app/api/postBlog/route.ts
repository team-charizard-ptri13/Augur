import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/MONGO_DB'
import Blog from '../../Model/Blog'


export async function POST(req: NextRequest, res: NextResponse) {
    try {
      connectDB();
      const { title, blogBody }: { title: string, blogBody: string } = await req.json();  
      console.log(title, blogBody);
  
      const user_name = 'test';  
  
      if (!title || !blogBody) {
        return NextResponse.json({ message: 'Both title and blogBody are required' }, { status: 400 });
      }
  
      const newBlogPost = new Blog({ user_name, blog_title: title, blog_body: blogBody });
      const savedBlog = await newBlogPost.save();
      
      return NextResponse.json({ message: 'Blog POST CREATED SUCCESSFULLY', data: savedBlog });
    } catch (err) {
      console.error('An error occurred:', err);
      return NextResponse.json({ message: 'Error during creating blog post' }, { status: 500 });
    }
  };
  