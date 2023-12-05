import { useEffect, useState } from "react"
import { Employee } from "../services/Employee/types"
import CircularProgress from "@mui/material/CircularProgress"
import EmployeeService from "../services/Employee/EmployeeService"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import { DataGrid } from "@mui/x-data-grid"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

interface State {
    employees?: Employee[]
}

interface CellType {
    row: Employee
  }

const columns = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 150,
      sortable: false,
      headerName: '# - Id',
      renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.id}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 125,
      sortable: false,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>{row.name}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 125,
      sortable: false,
      field: 'dateOfBirth',
      headerName: 'Date Of Birth',
      renderCell: ({ row }: CellType) => (
        <Typography variant='body2'>
          {row.dateOfBirth}
        </Typography>
      )
    }
  ]

const ListPage = () => {
    const [state, setState] = useState<State>({})

    useEffect(() => {
        const init = async () => {
            const response = await EmployeeService.listAsync()

            if(!response.success)
                return         
            
            setState(curr => ({...curr, employees: response.content}))
        }

        init()
    }, [])

    if(!state.employees)
        return <CircularProgress />

    return (
        <Container maxWidth="xl">
            <Box
            sx={{
                display: 'flex',
                pt: 5,
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: 'calc(100vh - 65.8px)',
                width: '100%',
            }}
            >
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <DataGrid
                                disableRowSelectionOnClick
                                disableColumnFilter
                                disableColumnMenu
                                disableColumnSelector
                                disableDensitySelector
                                autoHeight
                                pagination
                                rows={state.employees}
                                columns={columns}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default ListPage