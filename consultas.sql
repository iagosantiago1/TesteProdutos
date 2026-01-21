SELECT 
    p.id,
    p.nome AS produto,
    p.preco,
    c.nome AS categoria
FROM produtos p
INNER JOIN categorias c ON c.id = p.categoria_id;

SELECT 
    c.id AS categoria_id,
    c.nome AS categoria,
    p.nome AS produto
FROM categorias c
LEFT JOIN produtos p ON p.categoria_id = c.id;
