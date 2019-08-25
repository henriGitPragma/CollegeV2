import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Router } from '@angular/router';

export class FileNode {
  name: string;
  expanded: boolean;
  index: number;
  parent: number;
  childGroups: FileNode[];
}

@Component({
  selector: 'collegien-tree-calendar',
  templateUrl: './tree-calendar.component.html',
  styleUrls: ['./tree-calendar.component.css']
})
export class TreeCalendarComponent {

  //----------------------------------------------------------------------------
  //-----------------------Variables--------------------------------------------
  //----------------------------------------------------------------------------

  private nestedTreeControl: NestedTreeControl<FileNode>;
  private nestedDataSource: MatTreeNestedDataSource<FileNode>;

  private hasNestedChild = (_: number, nodeData: FileNode) => nodeData.childGroups.length > 0;
  private _getChildren = (node: FileNode) => node.childGroups;

  private sActiveYear: string;
  private sActiveMonth: string;


  //--------------------------------------------------------------------------------
  //-----------------------Constructeur + Injection de dépendances------------------
  //--------------------------------------------------------------------------------

  constructor(
    private router: Router
  ) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.nestedDataSource.data = this.generateCalendarMeteole();
  }
  //------------------------------------------------------------------------------
  //-----------------------Appelé apres le chargement de la page HTML---------------
  //------------------------------------------------------------------------------

  ngAfterViewInit(): void {
    this.nodeChange(null);
  }


  //------------------------------------------------------------------------
  //-----------------------Methodes-----------------------------------------
  //------------------------------------------------------------------------
  /**
   * Methode qui génère un calendrier automatiquement avec un point de départ 
   */
  generateCalendarMeteole() {
    const calendarMeteoles = [];
    const startYear = 2017;
    const startMonth = 1; // correspond à Février

    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    // les libelles par defaut
    this.sActiveYear = currentYear.toString();
    this.sActiveMonth = months[currentMonth];

    // Génération des années
    for (let year = currentYear; year >= startYear; year--) {

      // Génération des mois
      const childrens = [];
      const monthFirstIndex = year === startYear ? startMonth : 0;
      const monthLastIndex = year === currentYear ? currentMonth : 11;

      for (let x = monthFirstIndex; x <= monthLastIndex; x++) {
        // ajout des mois
        childrens.push(
          {
            name: months[x],
            expanded: (x === currentMonth ? true : false),
            index: childrens.length,
            parent: calendarMeteoles.length,
            childGroups: []
          }
        );
      }

      // Ajout des annees et de ses mois
      calendarMeteoles.push({
        name: year.toString(),
        expanded: (year === currentYear ? true : false),
        index: calendarMeteoles.length,
        parent: -1, // indique qu'on est a la racine
        childGroups: childrens // les nodes mois
      });
    }
    return calendarMeteoles;
  }

  // -----------------------------------------------------------------------------------------------
  /**
   * Au clic sur le treenode on va changer l'état de tous les élements
   * @param node 
   */
  nodeClick(node) {
    //console.log(node);
    // Cette methode va fermer tous les élements
    this.collapseAll();
    // Puis on va ouvrir les nodes qui nous concernent
    this.expandNodewidthParent(node);
    // Taches à réaliser sur le clic
    this.nodeChange(node);
  }


  // -----------------------------------------------------------------------------------------------
  /**
   * Méthode pour fermer tous les élements
   */
  collapseAll() {
    this.nestedDataSource.data.forEach((year: FileNode) => {
      // ** pour l'année on ferme tous les mois
      year.childGroups.forEach((month: FileNode) => month.expanded = false);
      // ** puis on ferme l'année
      year.expanded = false;
    });
  }

  // -----------------------------------------------------------------------------------------------
  /**
   * Méthode pour ouvrir le node et son parent passes en parametre
   * @param node 
   */
  expandNodewidthParent(node) {
    if (node) {
      // ** si on n'est pas à la racine (si pas une annee)
      if (node.parent !== -1) {
        // ** on ouvre le parent (l'annee)
        this.nestedDataSource.data[node.parent].expanded = true;
        // ** on prend sons nom
        this.sActiveYear = this.nestedDataSource.data[node.parent].name;
        // ** ensuite on ouvre l'élément cliqué (le mois ou l'année)
        node.expanded = true; // this.nestedDataSource.data[node.parent].childGroups[node.index].expanded = true;
        // ** on prend sons nom
        this.sActiveMonth = node.name;
      } else {
        // ** on ouvre le node courant (le mois)
        this.nestedDataSource.data[node.index].expanded = true;
        // ** on prend sons nom
        this.sActiveYear = this.nestedDataSource.data[node.index].name;
        // ** et son 1er enfant
        this.nestedDataSource.data[node.index].childGroups[0].expanded = true;
        // ** on prend sons nom
        this.sActiveMonth = this.nestedDataSource.data[node.index].childGroups[0].name;
      }
    }
  }

  // -----------------------------------------------------------------------------------------------
  /**
   * Quand on a cliqué sur le mois ou l'année 
   * @param node 
   */
  nodeChange(node) {
    /*
        if (node) {
          if (node.parent === -1) {
            // si c'est une année
          } else {
            // si c'est un mois
          }
        };
     */
    console.log('***************', this.sActiveYear, this.sActiveMonth);

    //this.router.navigate(['/eolienMeteole'], { queryParams: { data: node.name } });
    this.router.navigate(['/dashboard'], { queryParams: { annee: this.sActiveYear, mois: this.sActiveMonth } });
  }
}
