'use client'

import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import React from 'react'
import { useRouter } from 'next/navigation';


interface IssueForm {
  title: string;
  description: string;
}

const NewIssuesPage = () => {
  const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form 
    className='max-w-xl space-y-4' 
    onSubmit={handleSubmit(async (data) => {
      await axios.post('/api/issues', data);
      router.push('/issues');
    })}>
        <TextField.Root placeholder='Title' {...register('title')} />
        <Controller 
        name = 'description'
        control = {control}
        render = {({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        
        <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuesPage