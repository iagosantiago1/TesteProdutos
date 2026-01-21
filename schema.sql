CREATE TABLE categorias (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(250)
);

CREATE TABLE produtos (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    quantidade_estoque BIGINT NOT NULL,
    data_cadastro TIMESTAMP,
    categoria_id BIGINT,
    CONSTRAINT fk_categoria FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
);

CREATE INDEX idx_produto_categoria
    ON produtos(categoria_id);

INSERT INTO categorias (nome, descricao) VALUES
('Eletrônicos', 'Produtos eletrônicos em geral'),
('Alimentos', 'Produtos alimentícios'),
('Vestuário', 'Roupas e acessórios');

INSERT INTO produtos (nome, preco, quantidade_estoque, data_cadastro, categoria_id) VALUES
('Iphone 12', 2500.00, 15, NOW(), 1),
('Notebook', 4200.00, 8, NOW(), 1),
('Teclado', 199.90, 30, NOW(), 1),

('Fatia de Pudim', 6.90, 50, NOW(), 2),
('Sanduíche', 8.50, 70, NOW(), 2),
('Abacate', 7.99, 40, NOW(), 2),

('Camiseta', 39.90, 25, NOW(), 3),
('Calça Jeans', 120.00, 15, NOW(), 3),
('Coturno', 250.00, 12, NOW(), 3),

('Chocolate', 6.90, 100, NOW(), 2);
