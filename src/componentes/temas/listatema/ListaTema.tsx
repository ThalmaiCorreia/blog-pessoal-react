import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import Tema from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';

import './ListaTema.css';
import { busca } from '../../../sevices/Services';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaTema() {
  const [temas, setTemas] = useState<Tema[]>([])
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token == '') {
      toast.error("Você precisa estar logado", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      })
      navigate('/login')
    }
  }, [token])

  async function getTema() {
    await busca("/tema", setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }
  useEffect(() => {
    getTema()
  }, [temas.length])
  return (

    <Box m={12}>

      <Link to={`/formularioTema`} className="text-decorator-none">
        <Box mx={1} className='center'>
          <Button variant="contained" className="marginLeft" size='small' color="primary" >
            Cadastrar Novo Tema
          </Button>
        </Box>
      </Link>



      <Box display='flex' className='cards'>
        {
          temas.map(tema => (
            <Box m={2} >
              <Card variant="outlined">
                <CardContent>

                  <Typography color="textSecondary" gutterBottom>
                    Tema
                  </Typography>

                  <Typography variant="h5" component="h2">
                    {tema.descricao}
                  </Typography>

                </CardContent>

                <CardActions>
                  <Box display="flex" justifyContent="center" mb={1.5} >

                    <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                      <Box mx={1}>
                        <Button variant="contained" className="marginLeft" size='small' color="primary" >
                          Atualizar
                        </Button>
                      </Box>
                    </Link>

                    <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                      <Box mx={1}>
                        <Button variant="contained" size='small' color="secondary">
                          Deletar
                        </Button>
                      </Box>
                    </Link>

                  </Box>
                </CardActions>

              </Card>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}

export default ListaTema;