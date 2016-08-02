import {Component, Directive, ElementRef, Inject} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'structure-gpx',
  template: '<h1>D3.js Integrated if background is yellow</h1>',
providers: [ElementRef]


})

export class StructureGPXComponent {
height:any = 500;
width:any = 960;
svg:any;
diagonal:any;
tree:any;
root:any;
i:number = 0;
e1: ElementRef;

	constructor(@Inject(ElementRef) elementRef: ElementRef){
		this.e1    = elementRef; 
     	console.log('in construcor');

	}


afterViewInit(){
	console.log('in afterViewInit');
	/*
var graph:any = d3.select(this.e1.nativeElement); 
console.log(graph);
		this.svg = graph.append("svg")
			.attr("width", 960)
			.attr("height", 500)
		    .append("g")
			.attr("transform", "translate(" + 120 + "," + 20 + ")");
console.log('layout tree');
		this.tree = d3.layout.tree()
					  .size([500, 960]);
console.log('svg diagonal');
		 this.diagonal = d3.svg.diagonal()
			               .projection(function(d) { return [d.y, d.x]; });

			               // load the external data
		d3.json("treeData.json", function(error, treeData) {
		  this.root = treeData[0];
		  this.update(this.root);
		});
		*/

}


/*

update(source) {

  // Compute the new tree layout.
  var nodes = this.tree.nodes(this.root).reverse(),
	  links = this.tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Declare the nodes…
  var node = this.svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++this.i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { 
		  return "translate(" + d.y + "," + d.x + ")"; });

  nodeEnter.append("circle")
	  .attr("r", 10)
	  .style("fill", "#fff");

  nodeEnter.append("text")
	  .attr("x", function(d) { 
		  return d.children || d._children ? -13 : 13; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { 
		  return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1);

  // Declare the links…
  var link = this.svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", this.diagonal);

}
*/
}