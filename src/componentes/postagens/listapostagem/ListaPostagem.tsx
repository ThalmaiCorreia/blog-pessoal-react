import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import Postagem from '../../../models/Postagem';
import './ListaPostagem.css';
import { busca } from '../../../sevices/Services';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function ListaPostagem() {

  const [posts, setPosts] = useState<Postagem[]>([])
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

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }
  useEffect(() => {
    getPost()
  }, [posts.length])

  return (
    <Box>
      <Box m={12} >

        <Link to={`/formularioPostagem`} className="text-decorator-none" >
          <Box mx={1} className="center">
            <Button variant="contained" size='small' color="primary" >
              Cadastrar Nova Postagem
            </Button>
          </Box>
        </Link>



        <Box display='flex' >

          {
            posts.map(post => (
              <Box m={2} >
                <Card variant="outlined">
                  <CardContent>

                    <Typography color="textSecondary" gutterBottom>
                      {post.tema?.descricao}
                    </Typography>

                    <Typography variant="h5" component="h2">
                      {post.titulo}
                    </Typography>

                    <Typography variant="body2" component="p">
                      {post.texto}
                    </Typography>

                    <Typography variant="body2" component="p">
                    </Typography>

                  </CardContent>

                  <CardActions>
                    <Box display="flex" justifyContent="center" mb={1.5}>

                      <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                        <Box mx={1}>
                          <Button variant="contained" className="marginLeft" size='small' color="primary" >
                            Atualizar
                          </Button>
                        </Box>
                      </Link>

                      <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
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
    </Box>
  )

}
export default ListaPostagem;