// src/queries.js

const lungCarcinomaAssociatedTargets = `
  query lungCarcinomaAssociatedTargets {
    disease(efoId:"EFO_0001071"){
      associatedTargets (page:{index:0, size:25}){
        rows{
          target{
            id
            approvedSymbol
          }
          score
          datatypeScores{
            id
            score
          }
        }
      }
    }
  }
`;

export { lungCarcinomaAssociatedTargets };
