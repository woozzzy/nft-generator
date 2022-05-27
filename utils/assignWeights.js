// Paths
const basePath = `${process.cwd()}/layers`

//Imports
import fs from 'fs'
import inquirer from 'inquirer'

async function readTraits() {
    let layers = fs.readdirSync(`${basePath}`)
        .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
    for (let i = 0; i < layers.length; i++) {
        let layer = layers[i]
        console.log(
            '\x1b[97m\x1b[1m\x1b[4m %s \x1b[96m %s \x1b[0m ',
            `CURRENTLY ASSIGNING WEIGHTS FOR`, `${layer.toUpperCase()}` 
        )
        let traitList = fs.readdirSync(`${basePath}/${layer}`)
            .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
        for (let j = 0; j < traitList.length; j++) {
            let trait = traitList[j]
            await inquirer.prompt([{
               type: 'input',
               name: 'weight',
               message: `Specify the weight of \x1b[91m ${trait} \x1b[0m`,
               validate: isValidWeight,
            }]).then((answer) => {
                let filename = trait
                if (trait.includes('#')) {
                    trait = trait.split('#')[0]
                }
                fs.renameSync(`${basePath}/${layer}/${filename}`,`${basePath}/${layer}/${trait}#${answer.weight}.png`)
                console.log(`\x1b[90m Renamed /${filename} -> /${trait}#${answer.weight}.png \x1b[0m`)
            }) 
        }
    }
}

async function isValidWeight(input) {
    if (isNaN(input) || (+input) <= 0) {
        return false
    }
    return true
}

readTraits()