import { Trash2 } from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table"
import { useEffect, useState } from "react"
import { api } from "./api"

function App() {
  // eslint-disable-next-line
  const [namesbd1, setNamesBd1] = useState<any[]>([])
  // eslint-disable-next-line
  const [namesbd2, setNamesBd2] = useState<any[]>([])

  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState("")
  const [name2, setName2] = useState("")

  useEffect(() => {
    const load = async () => {
      setLoading(true)

      try {
        const auxBd1 = await api.get("/db1")
        setNamesBd1(auxBd1.data?.results)
      } catch (e) {
        console.error(e)
      }

      try {
        const auxBd2 = await api.get("/db2")
        setNamesBd2(auxBd2.data?.results)
      } catch (e) {
        console.error(e)
      }

      setLoading(false)
    }

    load()
  }, [reload])

  const addName = async (db: string) => {
    if (!name.trim().length && !name2.trim().length) return

    setLoading(true)

    await api.post(`/${db}`, { name: name || name2 })

    setName("")
    setName2("")
    setReload(!reload)
    setLoading(false)
  }

  const deleteName = async (db: string, id: number) => {
    setLoading(true)

    await api.delete(`/${db}/${id}`)

    setReload(!reload)
    setLoading(false)
  }

  return (
    <div className="relative h-screen w-full bg-slate-950 flex flex-col items-center text-white">
      {loading && (
        <h3 className="absolute top-10 text-2xl font-bold animate-pulse">
          Carregando...
        </h3>
      )}
      <div className="flex gap-20 mt-24">
        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-2xl">bd1</h3>
          <Input
            placeholder="Adicione um nome..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="secondary" onClick={() => addName("db1")}>
            Adicionar
          </Button>
          <Table>
            <TableCaption>Lista de nomes do banco de dados 1</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="text-right">Excluir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...namesbd1].map((person, index) => (
                <TableRow key={index} className="hover:bg-muted/10 py-3">
                  <TableCell className="font-medium truncate w-full max-w-[200px]">
                    <p>{person?.name}</p>
                    {namesbd2?.find((p) => p?.name === person?.name) && (
                      <p className="text-xs text-green-500">
                        Possui nos 2 bancos
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-right">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteName("db1", person?.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-2xl">bd2</h3>
          <Input
            placeholder="Adicione um nome..."
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />
          <Button variant="secondary" onClick={() => addName("db2")}>
            Adicionar
          </Button>
          <Table>
            <TableCaption>Lista de nomes do banco de dados 2</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="text-right">Excluir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...namesbd2].map((person, index) => (
                <TableRow key={index} className="hover:bg-muted/10 py-3">
                  <TableCell className="font-medium truncate w-full max-w-[200px]">
                    <p>{person?.name}</p>
                    {namesbd1?.find((p) => p?.name === person?.name) && (
                      <p className="text-xs text-green-500">
                        Possui nos 2 bancos
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-right">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteName("db2", person?.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default App
