import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import CardHeader from '@mui/material/CardHeader'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import EmployeeService from '../services/Employee/EmployeeService'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import { ApiResponse } from '../services/types'
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';

interface FormData {
  id: number;
  name: string;
  dateOfBirth: string;
}

interface State {
  loading: boolean
  confirmDialogOpen: boolean
  responseDialogOpen: boolean
  response?: ApiResponse
  employee?: FormData
}

const defaultValues = {
  id: 0,
  name: '',
  dateOfBirth: '1900-01-01',
}

const schema = yup.object().shape({
  id: yup.number().min(1).required(),
  name: yup.string().required(),
  dateOfBirth: yup.string().required(),
})

const Home = () => {

  const [state, setState] = useState<State>({
    loading: false,
    confirmDialogOpen: false,
    responseDialogOpen: false,
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmitForm = (data: FormData) => {
    setState(curr => ({...curr, employee: data, confirmDialogOpen: true}))
  }

  const onSubmitCreate = async () => {
    if(!state.employee)
      return

    setState(curr => ({...curr, loading: true}))

    const response = await EmployeeService.createAsync({
      id: state.employee.id,
      name: state.employee.name,
      dateOfBirth: state.employee.dateOfBirth,
    })

    setState(curr => ({
      ...curr, 
      loading: false, 
      confirmDialogOpen: false, 
      response,
      responseDialogOpen: true,
      employee: undefined}))
    
    response.success && reset()
  }

  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 65.8px)',
            width: '100%',
          }}
        >
          <Card sx={{ width: 500 }}>
            <CardHeader title='New Employee' />
            <CardContent>   
                  <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmitForm)}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} md={4}>
                        <FormControl fullWidth sx={{ mb: 4 }}>
                          <Controller
                            name='id'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                              <TextField
                                autoFocus
                                label="Id"
                                type='number'
                                placeholder='Insert employee id'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                error={Boolean(errors.id)}
                              />
                            )}
                          />
                          {errors.id && (
                            <FormHelperText sx={{ color: 'error.main' }}>
                              {errors.id.message || ''}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        <FormControl fullWidth sx={{ mb: 4 }}>
                            <Controller
                              name='name'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                  label="Name"
                                  placeholder='Insert employee name'
                                  value={value}
                                  onBlur={onBlur}
                                  onChange={onChange}
                                  error={Boolean(errors.name)}
                                />
                              )}
                            />
                            {errors.name && (
                              <FormHelperText sx={{ color: 'error.main' }}>
                                {errors.name.message || ''}
                              </FormHelperText>
                            )}
                          </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth sx={{ mb: 4 }}>
                            <Controller
                              name='dateOfBirth'
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                  label="Date Of Birth"
                                  type='date'
                                  value={value}
                                  onBlur={onBlur}
                                  onChange={onChange}
                                  error={Boolean(errors.name)}
                                />
                              )}
                            />
                            {errors.dateOfBirth && (
                              <FormHelperText sx={{ color: 'error.main' }}>
                                {errors.dateOfBirth.message || ''}
                              </FormHelperText>
                            )}
                          </FormControl> 
                      </Grid>
                    </Grid>
                    <Button disabled={state.loading} fullWidth size='large' type='submit' variant='contained'>
                      {state.loading ? <CircularProgress /> : 'Create'}
                    </Button>
                  </form>
            </CardContent>    
          </Card>
        </Box>
      </Container>

      {/* CONFIRM DIALOG */}
      <Dialog fullWidth maxWidth='xs' open={state.confirmDialogOpen} onClose={() => setState(curr => ({...curr, confirmDialogOpen: false}))}>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '& svg': { mb: 6, color: 'warning.main' }
            }}
          >
            <Typography>
              Do you want to confirm the creation of the new employee?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
          }}
        >
          <Button disabled={state.loading} variant='contained' sx={{ mr: 2 }} onClick={onSubmitCreate}>
            {state.loading ? <CircularProgress size={24} /> : 'Confirm'}
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => setState(curr => ({...curr, confirmDialogOpen: false}))}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* RESPONSE DIALOG */}
      <Dialog fullWidth maxWidth='xs' open={state.responseDialogOpen} onClose={() => setState(curr => ({...curr, responseDialogOpen: false}))}>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '& svg': { mb: 6, color: 'warning.main' }
            }}
          >
            {state.response?.success ? (
              <>
                <DoneIcon />
                <Typography>
                {state.response?.message}
                </Typography>
              </>
              ) : (
                <>
                <ErrorIcon />
                {state.response?.errors.map((error, idx) => (
                  <Typography key={idx}>
                    {error.code}
                  </Typography>
                ))}
                </>
              )}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
          }}
        >
          <Button variant='outlined' color='secondary' onClick={() => setState(curr => ({...curr, responseDialogOpen: false}))}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Home
