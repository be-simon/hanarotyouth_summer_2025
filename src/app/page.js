'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Button, Card, CardContent, Typography, Box } from '@mui/material'

export default function Home() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  async function getQuestion() {
    setLoading(true)
    const { data, error } = await supabase
      .from('questions')
      .select('id, message, count')
      .order('count', { ascending: true })
      .limit(10)

    if (error) {
      console.error('Error fetching questions:', error)
      setQuestion('질문을 불러오는 데 실패했습니다.')
    } else if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length)
      const selectedQuestion = data[randomIndex]
      setQuestion(selectedQuestion.message)

      await supabase
        .from('questions')
        .update({ count: selectedQuestion.count + 1 })
        .eq('id', selectedQuestion.id)
    } else {
      setQuestion('질문이 없습니다.')
    }
    setLoading(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)', // Adjust height to center content vertically
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        질문 뽑기
      </Typography>
      <Button
        variant="contained"
        onClick={getQuestion}
        disabled={loading}
        size="large"
        sx={{ mb: 3, minWidth: '220px', minHeight: '60px', fontSize: '1.25rem' }}
      >
        {loading ? '뽑는 중...' : '질문 뽑기'}
      </Button>
      {question && (
        <Card variant="outlined" sx={{ mt: 4, p: 3, minWidth: 340 }}>
          <CardContent>
            <Typography variant="h3" component="p" sx={{ minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {question}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}
