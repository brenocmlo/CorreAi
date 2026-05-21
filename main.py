import os

def listar_em_arvore(diretorio_raiz, arquivo_saida):
    with open(arquivo_saida, 'w', encoding='utf-8') as f:
        # Caminha por todo o diretório
        for raiz, diretorios, arquivos in os.walk(diretorio_raiz):
            # Descobre o nível de profundidade para saber quantos traços colocar
            nivel = raiz.replace(diretorio_raiz, '').count(os.sep)
            indentacao = ' ' * 4 * nivel
            
            # Nome da pasta atual
            nome_pasta = os.path.basename(raiz)
            if nome_pasta == '':
                nome_pasta = os.path.basename(os.path.abspath(diretorio_raiz))
                
            f.write(f"{indentacao}[📁] {nome_pasta}/\n")
            
            # Sub-indentação para os arquivos dentro desta pasta
            indentacao_arquivos = ' ' * 4 * (nivel + 1)
            for arquivo in arquivos:
                # Evita salvar o próprio arquivo .txt de saída na lista se ele já tiver sido criado
                if arquivo != os.path.basename(arquivo_saida):
                    f.write(f"{indentacao_arquivos}📄 {arquivo}\n")

if __name__ == "__main__":
    # Pega a pasta atual onde o script está rodando
    pasta_atual = os.path.dirname(os.path.abspath(__file__)) if '__file__' in locals() else os.getcwd()
    
    nome_txt = os.path.join(pasta_atual, "estrutura_pastas.txt")
    
    print("Gerando a árvore de arquivos...")
    listar_em_arvore(pasta_atual, nome_txt)
    print(f"Pronto! A estrutura foi salva em: {nome_txt}")