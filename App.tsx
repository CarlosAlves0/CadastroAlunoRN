"use strict";

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';


// ==========================================
// SUAS FUNÇÕES
// NÃO ALTEREI A LÓGICA DELAS
// ==========================================

function isEmpty(value) {
  if (value === null || value === undefined){
    return true;
  }

  if (typeof(value) === "string" || Array.isArray(value)){
    return value.trim ? value.trim().length === 0 : value.length === 0;
  }

  return false;
}


function isValidEmail(email){
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}


function isValidNumber(value){
  if (value === undefined || value === null){
    return false;
  }

  const str = String(value).trim().replace(',', '.');

  const regexDecimal = /^[-+]?\d+(\.\d+)?$/;

  return regexDecimal.test(str);
}


// ==========================================
// APP
// ==========================================

export default function App() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [ra, setRa] = useState('');
  const [curso, setCurso] = useState('');

  const [nomeValidado, setNomeValidado] = useState(false);
  const [emailValidado, setEmailValidado] = useState(false);
  const [raValidado, setRaValidado] = useState(false);
  const [cursoValidado, setCursoValidado] = useState(false);

  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [mostrarCursos, setMostrarCursos] = useState(false);


  // ==========================================
  // VALIDAÇÕES
  // USANDO SUAS FUNÇÕES
  // ==========================================

  function validarNome() {
    setNomeValidado(!isEmpty(nome));
  }

  function validarEmail() {
    setEmailValidado(
      !isEmpty(email) && isValidEmail(email)
    );
  }

  function validarRa() {
    setRaValidado(
      !isEmpty(ra) && isValidNumber(ra)
    );
  }


  // ==========================================
  // SELECIONAR CURSO
  // ==========================================

  function selecionarCurso(nomeCurso) {
    setCurso(nomeCurso);
    setCursoValidado(true);
    setMostrarCursos(false);
  }


  // ==========================================
  // CRIAR CONTA
  // ==========================================

  function criarConta() {

    setTentouEnviar(true);

    const nomeValido = !isEmpty(nome);

    const emailValido =
      !isEmpty(email) &&
      isValidEmail(email);

    const raValido =
      !isEmpty(ra) &&
      isValidNumber(ra);

    const cursoValido =
      !isEmpty(curso);


    setNomeValidado(nomeValido);
    setEmailValidado(emailValido);
    setRaValidado(raValido);
    setCursoValidado(cursoValido);
  }


  // ==========================================
  // LIMPAR
  // ==========================================

  function limparCampos() {

    setNome('');
    setEmail('');
    setRa('');
    setCurso('');

    setNomeValidado(false);
    setEmailValidado(false);
    setRaValidado(false);
    setCursoValidado(false);

    setTentouEnviar(false);
    setMostrarCursos(false);
  }


  // ==========================================
  // FRONT-END
  // ==========================================

  return (
    <View style={styles.container}>

      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        {/* CABEÇALHO */}

        <View style={styles.header}>

          <TouchableOpacity>
            <Text style={styles.voltar}>
              ← Voltar
            </Text>
          </TouchableOpacity>

          <View style={styles.logo}>
            <Text style={styles.logoTexto}>
              GE
            </Text>
          </View>

        </View>


        {/* TÍTULO */}

        <View style={styles.tituloArea}>

          <Text style={styles.titulo}>
            Criar conta
          </Text>

          <Text style={styles.subtitulo}>
            Crie sua conta na Global English e
            comece sua jornada de aprendizado.
          </Text>

        </View>


        {/* FORMULÁRIO */}

        <View style={styles.form}>

          {/* NOME */}

          <Text style={styles.label}>
            Nome completo
            <Text style={styles.obrigatorio}> *</Text>
          </Text>

          <View
            style={[
              styles.inputContainer,

              (tentouEnviar || nome.length > 0) &&
                (nomeValidado
                  ? styles.inputValido
                  : styles.inputErro)
            ]}
          >

            <Text style={styles.icone}>
              👤
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex: Ana Silva"
              placeholderTextColor="#9AA3B2"
              value={nome}
              onChangeText={(texto) => {
                setNome(texto);
                setNomeValidado(false);
              }}
              onBlur={validarNome}
            />

          </View>

          {tentouEnviar && !nomeValidado && (
            <Text style={styles.erro}>
              Campo obrigatório. Informe seu nome completo.
            </Text>
          )}


          {/* EMAIL */}

          <Text style={styles.label}>
            E-mail
            <Text style={styles.obrigatorio}> *</Text>
          </Text>

          <View
            style={[
              styles.inputContainer,

              (tentouEnviar || email.length > 0) &&
                (emailValidado
                  ? styles.inputValido
                  : styles.inputErro)
            ]}
          >

            <Text style={styles.icone}>
              ✉
            </Text>

            <TextInput
              style={styles.input}
              placeholder="nome@exemplo.com"
              placeholderTextColor="#9AA3B2"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(texto) => {
                setEmail(texto);
                setEmailValidado(false);
              }}
              onBlur={validarEmail}
            />

          </View>

          {tentouEnviar && !emailValidado && (
            <Text style={styles.erro}>
              Formato inválido. Informe um e-mail válido.
            </Text>
          )}


          {/* RA */}

          <Text style={styles.label}>
            RA (Registro Acadêmico)
            <Text style={styles.obrigatorio}> *</Text>
          </Text>

          <View
            style={[
              styles.inputContainer,

              (tentouEnviar || ra.length > 0) &&
                (raValidado
                  ? styles.inputValido
                  : styles.inputErro)
            ]}
          >

            <Text style={styles.icone}>
              ▣
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Apenas números (ex: 123456)"
              placeholderTextColor="#9AA3B2"
              keyboardType="numeric"
              value={ra}
              onChangeText={(texto) => {
                setRa(texto);
                setRaValidado(false);
              }}
              onBlur={validarRa}
            />

          </View>

          {tentouEnviar && !raValidado && (
            <Text style={styles.erro}>
              Campo obrigatório. Informe seu RA.
            </Text>
          )}


          {/* CURSO */}

          <Text style={styles.label}>
            Curso
            <Text style={styles.obrigatorio}> *</Text>
          </Text>

          <TouchableOpacity
            style={[
              styles.inputContainer,

              (tentouEnviar || curso.length > 0) &&
                (cursoValidado
                  ? styles.inputValido
                  : styles.inputErro)
            ]}
            onPress={() => {
              setMostrarCursos(!mostrarCursos);
            }}
          >

            <Text style={styles.icone}>
              🎓
            </Text>

            <Text
              style={[
                styles.inputCurso,
                curso === '' && styles.placeholderCurso
              ]}
            >
              {curso || 'Selecione seu curso'}
            </Text>

            <Text style={styles.seta}>
              {mostrarCursos ? '⌃' : '⌄'}
            </Text>

          </TouchableOpacity>


          {/* OPÇÕES DE CURSO */}

          {mostrarCursos && (

            <View style={styles.menuCursos}>

              <TouchableOpacity
                style={styles.opcaoCurso}
                onPress={() => selecionarCurso('Inglês')}
              >

                <Text style={styles.bandeira}>
                  🇺🇸
                </Text>

                <View>
                  <Text style={styles.nomeCurso}>
                    Inglês
                  </Text>

                  <Text style={styles.descricaoCurso}>
                    Curso de Inglês
                  </Text>
                </View>

              </TouchableOpacity>


              <TouchableOpacity
                style={styles.opcaoCurso}
                onPress={() => selecionarCurso('Espanhol')}
              >

                <Text style={styles.bandeira}>
                  🇪🇸
                </Text>

                <View>
                  <Text style={styles.nomeCurso}>
                    Espanhol
                  </Text>

                  <Text style={styles.descricaoCurso}>
                    Curso de Espanhol
                  </Text>
                </View>

              </TouchableOpacity>

            </View>
          )}


          {tentouEnviar && !cursoValidado && (
            <Text style={styles.erro}>
              Selecione um curso para continuar.
            </Text>
          )}


          {/* BOTÃO */}

          <TouchableOpacity
            style={styles.botaoCriar}
            onPress={criarConta}
          >

            <Text style={styles.textoBotao}>
              Criar minha conta
            </Text>

          </TouchableOpacity>


          {/* LIMPAR */}

          <TouchableOpacity
            style={styles.botaoLimpar}
            onPress={limparCampos}
          >

            <Text style={styles.textoLimpar}>
              Limpar campos
            </Text>

          </TouchableOpacity>


          {/* TERMOS */}

          <Text style={styles.termos}>
            Ao criar a conta, você concorda com os{' '}

            <Text style={styles.link}>
              Termos de Uso
            </Text>
          </Text>

        </View>

      </ScrollView>

    </View>
  );
}


// ==========================================
// ESTILOS
// ==========================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  scroll: {
    paddingBottom: 40,
  },

  header: {
    height: 80,
    paddingHorizontal: 28,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#FFFFFF',

    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  voltar: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '500',
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 12,

    backgroundColor: '#2563EB',

    justifyContent: 'center',
    alignItems: 'center',
  },

  logoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  tituloArea: {
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 22,
  },

  titulo: {
    fontSize: 30,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 7,
  },

  subtitulo: {
    fontSize: 14,
    lineHeight: 21,
    color: '#64748B',
  },

  form: {
    backgroundColor: '#FFFFFF',

    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',

    paddingHorizontal: 28,
    paddingTop: 15,
    paddingBottom: 25,
  },

  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#334155',

    marginTop: 14,
    marginBottom: 8,
  },

  obrigatorio: {
    color: '#EF4444',
  },

  inputContainer: {
    height: 50,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1.5,
    borderColor: '#D7DDE7',

    borderRadius: 10,

    backgroundColor: '#FFFFFF',

    paddingHorizontal: 13,
  },

  input: {
    flex: 1,
    height: '100%',

    fontSize: 14,
    color: '#1E293B',

    marginLeft: 10,
  },

  icone: {
    width: 22,
    textAlign: 'center',
    fontSize: 17,
  },

  inputValido: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },

  inputErro: {
    borderColor: '#EF4444',
    backgroundColor: '#FFF5F5',
  },

  inputCurso: {
    flex: 1,

    fontSize: 14,
    color: '#1E293B',

    marginLeft: 10,
  },

  placeholderCurso: {
    color: '#9AA3B2',
  },

  seta: {
    fontSize: 21,
    color: '#2563EB',
    marginLeft: 5,
  },

  menuCursos: {
    marginTop: 6,

    borderWidth: 1,
    borderColor: '#DBE1E9',

    borderRadius: 10,

    backgroundColor: '#FFFFFF',

    overflow: 'hidden',
  },

  opcaoCurso: {
    minHeight: 62,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 15,

    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F5',
  },

  bandeira: {
    fontSize: 25,
    marginRight: 13,
  },

  nomeCurso: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },

  descricaoCurso: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 3,
  },

  erro: {
    color: '#DC2626',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
  },

  botaoCriar: {
    height: 50,

    backgroundColor: '#2563EB',

    borderRadius: 11,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 27,

    elevation: 3,

    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  botaoLimpar: {
    height: 47,

    borderWidth: 1,
    borderColor: '#DBE1E9',

    borderRadius: 11,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,

    backgroundColor: '#FFFFFF',
  },

  textoLimpar: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '500',
  },

  termos: {
    textAlign: 'center',

    fontSize: 10,

    color: '#94A3B8',

    marginTop: 24,

    lineHeight: 16,
  },

  link: {
    color: '#2563EB',
    fontWeight: '600',
  },

});