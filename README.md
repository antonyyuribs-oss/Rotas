# Rotas de Diligências — v3.6

Nesta versão, quando houver endereços importados sem latitude/longitude, aparece um aviso azul visível na própria tela da rota com o botão **Localizar**. Isso transforma os endereços em coordenadas para que os marcadores apareçam no mapa.

# Rotas de Diligências — versão 3.6 final para GitHub

PWA local-first para organização de diligências em mapa, com armazenamento criptografado no aparelho.

## O que já está incluído

- Rotas e diligências com nome, número do mandado, endereço, observações, cor e coordenadas.
- Mapa com marcadores e modo espacial offline.
- Status Pendente, Não entregue e Entregue.
- PDFs e imagens anexados de forma criptografada.
- Assinatura na tela em JPEG ou importação de imagem de assinatura.
- Busca por nome, número do mandado, endereço ou observações.
- Filtros por status e cor; agrupamento visual por cor.
- Marcadores pequenos, médios ou grandes.
- Importação rápida por texto colado, CSV ou JSON.
- Relatório/impressão da rota ou de uma diligência.
- Abertura do destino no Google Maps.
- Backup criptografado.

## Importação rápida — forma recomendada

Dentro de uma rota, toque em **Importar**. Você pode colar diretamente:

```text
João da Silva | Rua Paraná, 3505, Ariquemes - RO
Maria Souza | Av. Tancredo Neves, 1200, Ariquemes - RO
```

Também funciona ao copiar duas colunas de uma planilha (Nome e Endereço) e colar no campo.

JSON mínimo aceito:

```json
[
  {"nome": "João da Silva", "endereco": "Rua Paraná, 3505, Ariquemes - RO"},
  {"nome": "Maria Souza", "endereco": "Av. Tancredo Neves, 1200, Ariquemes - RO"}
]
```

Também aceita o formato compacto:

```json
[
  ["João da Silva", "Rua Paraná, 3505, Ariquemes - RO"],
  ["Maria Souza", "Av. Tancredo Neves, 1200, Ariquemes - RO"]
]
```

CSV mínimo:

```csv
nome,endereco
João da Silva,Rua Paraná 3505 - Ariquemes RO
Maria Souza,Av. Tancredo Neves 1200 - Ariquemes RO
```

Depois da importação, você pode abrir cada diligência e acrescentar cor, observações, número do mandado, PDF/imagem e assinatura.

## Colocar no GitHub Pages

1. Extraia este ZIP.
2. Crie um repositório no GitHub.
3. Envie **todos os arquivos de dentro da pasta** para a raiz do repositório.
4. No GitHub, abra **Settings > Pages**.
5. Em **Source**, escolha **Deploy from a branch**.
6. Selecione a branch **main** e a pasta **/(root)**.
7. Salve e aguarde o GitHub mostrar o endereço publicado.

## Privacidade

O GitHub hospeda o código, não os mandados cadastrados no navegador. Dados textuais são armazenados em cofre criptografado; anexos e assinaturas são criptografados no IndexedDB. A busca online de endereços e o mapa de ruas são opcionais. Ao usar a busca online, o texto do endereço é enviado ao serviço de geocodificação; ao tocar em Navegar, o destino é enviado ao Google Maps.

## Backup

Como os dados ficam no próprio dispositivo, use **Exportar backup** periodicamente. O backup é criptografado.


## Correção v3.6
- Botão de criação de proteção usa `addEventListener` em vez de depender de `onclick`.
- CSP compatível com os controles existentes.
- Service worker usa rede primeiro para arquivos do app, reduzindo risco de cache antigo.
- A tela inicial mostra `versão 3.6` para confirmação visual.


## Atualização v3.6
- Arquivos JS/CSS/SW receberam nomes novos para evitar cache de versões antigas.
- O botão **⌖ Localizar** aparece no cabeçalho e sobre o mapa quando houver endereços sem coordenadas.
- O mapa tenta OpenStreetMap e, se os blocos falharem, usa um provedor alternativo com atribuição.
- Para forçar a primeira abertura desta versão, acesse `v36.html` uma vez.
