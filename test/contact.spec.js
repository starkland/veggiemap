import Vue from 'vue';
import Contact from '../src/views/Contact.vue';

describe('Testando o componente de Contato.', () => {
  it('Verifica se o name está correto', () => expect(Contact.name).toBe('vgContact'));

  it('Verifica se os componentes foram injetados corretamente.', () => {
    let components = Object.keys(Contact.components);
    expect(components[0]).toBe('vgHeader');
  })
});