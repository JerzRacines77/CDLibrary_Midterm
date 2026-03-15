import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { COLORS } from '../constants/index.js';

export const AddCDModal = ({ visible, onConfirm, onCancel }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [copies, setCopies] = useState('1');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    if (!artist.trim()) e.artist = 'Artist is required';
    const c = parseInt(copies);
    if (!copies || isNaN(c) || c < 1) e.copies = 'At least 1 copy required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    onConfirm(title.trim(), artist.trim(), parseInt(copies), genre.trim(), parseInt(year) || new Date().getFullYear());
    reset();
  };

  const reset = () => { setTitle(''); setArtist(''); setCopies('1'); setGenre(''); setYear(''); setErrors({}); };
  const handleCancel = () => { reset(); onCancel(); };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleCancel}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Add New CD</Text>
          <Text style={styles.subtitle}>Add a CD to the library inventory</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>CD Title *</Text>
            <TextInput style={[styles.input, errors.title && styles.inputError]} placeholder="e.g. Thriller" placeholderTextColor={COLORS.textMuted} value={title} onChangeText={t => { setTitle(t); setErrors(p => ({ ...p, title: '' })); }} />
            {errors.title ? <Text style={styles.error}>{errors.title}</Text> : null}

            <Text style={styles.label}>Artist *</Text>
            <TextInput style={[styles.input, errors.artist && styles.inputError]} placeholder="e.g. Michael Jackson" placeholderTextColor={COLORS.textMuted} value={artist} onChangeText={t => { setArtist(t); setErrors(p => ({ ...p, artist: '' })); }} autoCapitalize="words" />
            {errors.artist ? <Text style={styles.error}>{errors.artist}</Text> : null}

            <View style={styles.row}>
              <View style={styles.halfField}>
                <Text style={styles.label}>Copies *</Text>
                <TextInput style={[styles.input, errors.copies && styles.inputError]} placeholder="1" placeholderTextColor={COLORS.textMuted} value={copies} onChangeText={t => { setCopies(t); setErrors(p => ({ ...p, copies: '' })); }} keyboardType="number-pad" />
                {errors.copies ? <Text style={styles.error}>{errors.copies}</Text> : null}
              </View>
              <View style={styles.halfField}>
                <Text style={styles.label}>Year</Text>
                <TextInput style={styles.input} placeholder={`${new Date().getFullYear()}`} placeholderTextColor={COLORS.textMuted} value={year} onChangeText={setYear} keyboardType="number-pad" maxLength={4} />
              </View>
            </View>

            <Text style={styles.label}>Genre</Text>
            <TextInput style={styles.input} placeholder="e.g. Pop, Rock, Jazz..." placeholderTextColor={COLORS.textMuted} value={genre} onChangeText={setGenre} />
          </ScrollView>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addBtn} onPress={handleConfirm}>
              <Text style={styles.addText}>ADD CD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  container: { backgroundColor: COLORS.secondary, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '90%', paddingBottom: Platform.OS === 'ios' ? 40 : 24 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  subtitle: { fontSize: 12, color: COLORS.textMuted, marginBottom: 20 },
  label: { fontSize: 11, color: COLORS.textMuted, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 14, color: COLORS.text, fontSize: 14, borderWidth: 1, borderColor: COLORS.border },
  inputError: { borderColor: COLORS.accent },
  error: { color: COLORS.accent, fontSize: 11, marginTop: 4 },
  row: { flexDirection: 'row', gap: 12 },
  halfField: { flex: 1 },
  actions: { flexDirection: 'row', gap: 12, marginTop: 24 },
  cancelBtn: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  cancelText: { color: COLORS.textMuted, fontWeight: '800', fontSize: 12, letterSpacing: 1 },
  addBtn: { flex: 2, backgroundColor: COLORS.success, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  addText: { color: COLORS.textDark, fontWeight: '800', fontSize: 12, letterSpacing: 1 },
});