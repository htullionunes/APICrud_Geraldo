const router = require('express').Router()
const Employee = require('../models/Employee')

// Rotas da API
router.post('/', async (req, res) => {
  
    //Create - Criação de Dados
    const {id, nome, endereco, tel, salario, approved} = req.body

      if(!id) {
        res.status(422).json({error: 'O ID é obrigatório!' })
      return
    }
      if(!nome) {
        res.status(422).json({error: 'O Nome é obrigatório!' })
      return
      }
      if(!endereco) {
        res.status(422).json({error: 'O Endereço é obrigatório!' })
      return
      }
      if(!tel) {
        res.status(422).json({error: 'O Telefone é obrigatório!' })
      return
      }
      if(!salario) {
        res.status(422).json({error: 'O Salário é obrigatório!' })
      return
      }

    const employee ={
        id,
        nome,
        endereco,
        tel,
        salario,
        approved
    }

    try{

        await Employee.create(employee)

        res.status(201).json({message:'Funcionário(a) cadastrado com sucesso(a)!'})

    } catch (error){
        res.status(500).json({error: error})
    }

})

  //Read - Leitura dos Dados
  router.get('/', async (req, res) => {
    try {

    const employees = await Employee.find()

    res.status(200).json({message: employees})

} catch (error){
    res.status(500).json({error: error})
}
})

router.get('/:id', async (req, res) => {

    const idDB = req.params.id

        try{
         const employee = await Employee.findOne({_id: idDB})

         if(!employee){
            res.status(422).json({message: 'Funcionário(a) não foi encontrado(a)!'})
        return
        }

         res.status(200).json(employee)
        } catch (error) {
            res.status(500).json({error: error})
        }
})

 //Edit - Edição dos Dados (PATCH)
    router.patch('/:id', async (req, res) =>{
        
        const idDB = req.params.id

        const {id, nome, endereco, tel, salario, approved} = req.body

        const employee ={
            id,
            nome,
            endereco,
            tel,
            salario,
            approved
        }

        try{
            const updatedEmployee = await Employee.updateOne({ _id: idDB}, employee)

            if(updatedEmployee.matchedCount === 0) {
                res.status(422).json({message: 'Funcionário(a) não foi encontrado(a)!'})
            }

            res.status(200).json(employee)

        } catch (error) {
            res.status(500).json({error: error})
        }
    })

//Delete - Deletar Dados
    router.delete('/:id', async (req, res) => {

        const idDB = req.params.id

         const employee = await Employee.findOne({ _id: idDB})

         if(!employee){
            res.status(422).json({message: 'Funcionário(a) não foi encontrado(a)!'})
        return
         }    
         try{

            await Employee.deleteOne({ _id: idDB})

            res.status(200).json({message: 'Funcionário(a) removido com sucesso!'})
            } 
        catch(error) {
            res.status(500).json({error: error})
        }  
    })

module.exports = router