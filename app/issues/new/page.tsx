'use client';

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Link from 'next/link'


type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuesPage = () => {
  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post('/api/issues', data);
    router.push('/issues');
    } catch (error) {
      setError('An unexpected error has occured.')
    }
    
  })

  return (
    <div className='max-w-xl'>
      { error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
      <form 
      className='space-y-4' 
      onSubmit={onSubmit}>
          <TextField.Root placeholder='Title' {...register('title')} />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller 
          name = 'description'
          control = {control}
          render = {({ field }) => <SimpleMDE placeholder="Description" {...field} />}
          />

          <ErrorMessage>{errors.description?.message}</ErrorMessage>

          <div className='flex justify-between'>
            <Button>Submit New Issue</Button>
            <Button><Link href='/issues'>Back</Link></Button>

          </div>
          
      </form>
    </div>
  )
}

export default NewIssuesPage