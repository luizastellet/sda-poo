import { Link, useNavigate } from "react-router-dom";
import react, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import Button from "../components/Button";
import Produto from "../components/Produto";
import ProdutoFields from "../components/ProdutoFields";
import ProdutoSuccess from "../components/ProdutoSuccess";
import { IdContainer, EndContainer, Title, Label, Input, InnerContainer } from '../components/Style'
import Header from "../components/Header";
import NotAllowed from "./NotAllowed";
import EditarProduto from "../components/EditarProduto";


const Produtos = (props) => {
    const [textButton, setTextButton] = useState("Cadastrar")
    const url = "https://sda-api.herokuapp.com/produtos";
    const [produtos, getProdutos] = useState('')
    const [sentData, setSentData] = useState(false);
    const [edit, setEdit] = useState(false)
    const [edited, setEdited] = useState(false)
    const [data, setData] = useState({
        nome: "",
        quantidade: "",
        preco: ""
    })

    useEffect(() => {
        getAllprodutos()
    }, [])

    useEffect(() => {
        !edit && getAllprodutos()
    }, [edit])

    useEffect(() => {
        sentData &&
            getAllprodutos()
    }, [sentData])

    const getAllprodutos = async () => {
        Axios.get(url)
            .then((response) => {
                getProdutos(response.data)
            })
            .catch((e) => {
                console.error(e);
            })
    }
    console.log(produtos)

    function submit(s) {
        s.preventDefault();
        Axios.post(url, {
            nome: data.nome,
            quantidade: data.quantidade,
            preco: data.preco
        })
            .then((res) => {
                setSentData(true)
                setTimeout(() => { setSentData(false); }, 2000);
                setData({ nome: "", quantidade: "", preco: "" });
            })
    }

    function handle(d) {
        const newData = { ...data };
        newData[d.target.id] = d.target.value;
        setData(newData);
        setSentData(false)
    }

    console.log(props.user, edit)

    if (!!props.user) {
        return (
            <>
                <Header />
                <BG>
                    <Wrapper>
                        <TopContainer>
                            Produtos
                        </TopContainer>
                        <BottomContainer>
                            <List>
                                <ProdutoFields />
                                {Array.isArray(produtos) &&
                                    produtos.map(element => (
                                        <Produto
                                            key={element.id}
                                            id={element.id}
                                            nome={element.nome}
                                            quantidade={element.quantidade}
                                            preco={element.preco}
                                            setEdit={setEdit}
                                        />
                                    )
                                    )}

                            </List>
                            {edit && (
                                <Container>
                                    <EditarProduto id={edit} setEdit={setEdit} edited={setEdited} />
                                </Container>
                            )}
                            {!edit && (
                                <Container>
                                    {!sentData &&
                                        <FormContainer onSubmit={(s) => submit(s)}>
                                            <p style={{ fontWeight: "600", fontSize: "17px", paddingBottom: "15px", width: "100%", display: "flex", justifyContent: "center" }}>Cadastrar novo produto</p>
                                            <WrapperForm>
                                                <ContentContainer>
                                                    <Item>
                                                        <Label htmlFor="nome">Nome: </Label>
                                                        <Input onChange={(d) => handle(d)} value={data.nome} type="text" name="nome" id="nome" required />
                                                    </Item>
                                                    <Item>
                                                        <Label htmlFor="quantidade">Quantidade: </Label>
                                                        <Input onChange={(d) => handle(d)} value={data.quantidade} type="number" name="quantidade" id="quantidade" required />
                                                    </Item>
                                                    <Item>
                                                        <Label htmlFor="preco">Preço: </Label>
                                                        <Input onChange={(d) => handle(d)} value={data.preco} type="text" name="preco" id="preco" required />
                                                    </Item>
                                                </ContentContainer>
                                            </WrapperForm>
                                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                                <div style={{ marginTop: "10px", width: "50%", display: "flex", justifyContent: "space-around" }}>
                                                    <Button func={() => setData({ nome: "", quantidade: "", preco: "" })} text={"Limpar campos"} />
                                                    <Button type="submit" text={textButton} />
                                                </div>
                                            </div>
                                        </FormContainer>
                                    }
                                    {sentData &&
                                        <ProdutoSuccess text={"Produto cadastrado com sucesso!"}></ProdutoSuccess>}
                                </Container>
                            )}
                        </BottomContainer>
                    </Wrapper>
                </BG>
            </>

        );
    } else {
        return (<NotAllowed />)
    }
};

export default Produtos;

const BG = styled.div`
    background-color: #E5E5E5; 
    width: 100vw;
    height: 100vh; 
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; 
`

const Wrapper = styled.div`
    margin: 90px 0 0 0; 
    width: 90vw; 
    height: 600px; 
    background-color: #FFF; 
    display: flex; 
    flex-direction: column;
`

const TopContainer = styled.div`
    border-bottom: 2px solid #E5E5E5; 
    min-height: 75px; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500; 
    padding: 0 20px 0 20px; 
    font-size: 17px;
`

const BottomContainer = styled.div`
    margin: 20px;
    overflow-y: hidden;
    display: flex; 

`

export const ButtonContainer = styled.div`
width: 100%; 
display: flex; 
justify-content: center;
`;

const List = styled.div`
    width: 50%;
    overflow-y: scroll;
    overflow-x: hidden;
`

const Container = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`


const ContentContainer = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    width: 75%;

`

const Item = styled.div`
    display: flex; 
    flex-direction: column;
    width: 70%;
`

const WrapperForm = styled.div`
    display: flex; 
    justify-content: center; 
`


const FormContainer = styled.form`
    width: 100%;
    height: 300px; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-content: space-between;

`