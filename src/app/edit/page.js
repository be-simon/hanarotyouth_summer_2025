'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Button, TextField, List, ListItem, ListItemText, IconButton, Box, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

export default function Edit() {
  const [questions, setQuestions] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    fetchQuestions()
  }, [])

  async function fetchQuestions() {
    const { data, error } = await supabase.from('questions').select('*').order('created_at', { ascending: false })
    if (error) console.error('Error fetching questions:', error)
    else setQuestions(data)
  }

  async function addQuestion() {
    if (newMessage.trim() === '') return
    const { error } = await supabase.from('questions').insert([{ message: newMessage, count: 0 }])
    if (error) console.error('Error adding question:', error)
    else {
      setNewMessage('')
      fetchQuestions()
    }
  }

  async function updateQuestion(id, message) {
    const { error } = await supabase.from('questions').update({ message }).eq('id', id)
    if (error) console.error('Error updating question:', error)
    else fetchQuestions()
  }

  async function deleteQuestion(id) {
    const { error } = await supabase.from('questions').delete().eq('id', id)
    if (error) console.error('Error deleting question:', error)
    else fetchQuestions()
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        질문 편집
      </Typography>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          fullWidth
          label="새 질문을 입력하세요"
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button variant="contained" onClick={addQuestion} sx={{ ml: 2 }}>
          추가
        </Button>
      </Box>
      <List>
        {questions.map((q) => (
          <ListItem key={q.id} disablePadding>
            <ListItemText 
              primary={<TextField 
                fullWidth 
                defaultValue={q.message} 
                onBlur={(e) => updateQuestion(q.id, e.target.value)}
                variant="standard"
              />} 
            />
            <IconButton edge="end" aria-label="delete" onClick={() => deleteQuestion(q.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}