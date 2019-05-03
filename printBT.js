let node = function (v) {
    return {
        value: v,
        left: null,
        right: null
    }
}
let root = new node(1);
root.left = new node(2);
root.right = new node(3);

root.left.left = new node(4);
root.left.right = new node(5);

root.right.left = new node(6);
root.right.right = new node(7);

root.left.left.left = new node(8);
root.left.left.right = new node(9);

root.left.right.left = new node(10);
root.left.right.right = new node(11);

root.right.left.left = new node(12)
root.right.left.right = new node(13);

root.right.right.left = new node(14);
root.right.right.right = new node(15);



let print = function(node){
    console.log(node.value);
    if(node.left !== null) print(node.left);
    if(node.right !== null) print(node.right);
    //console.log(node.value);
}


print(root);




