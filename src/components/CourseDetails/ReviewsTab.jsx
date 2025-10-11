import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Modal, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { reviewService } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';
import { reviewsTabStyles as styles } from '../../utils/courseDetailsStyles';

export default function ReviewsTab({ courseId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  
  // مودال للرسائل
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // مودال لتأكيد الحذف
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await reviewService.getCourseReviews(courseId);
        setReviews(data);
      } catch {
        showModal('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId]);

  const showModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const submitReview = async () => {
    if (!user) return showModal('Please login to submit review.');
    if (comment.trim().length < 10) return showModal('Comment must be at least 10 characters.');

    const newReview = {
      userId: user.id,
      userName: user.name || user.email.split('@')[0],
      userImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email.split('@')[0])}&background=1e40af&color=fff`,
      rating,
      comment: comment.trim(),
      createdAt: new Date()
    };

    try {
      const id = await reviewService.addReview(courseId, newReview);
      setReviews([{ ...newReview, id }, ...reviews]);
      setShowForm(false);
      setComment('');
      setRating(5);
      showModal('Review submitted!');
    } catch {
      showModal('Failed to submit review.');
    }
  };

  const confirmDelete = async () => {
    if (!reviewToDelete) return;
    try {
      await reviewService.deleteReview(courseId, reviewToDelete.id);
      setReviews(reviews.filter(r => r.id !== reviewToDelete.id));
      setDeleteConfirmVisible(false);
      showModal('Review deleted.');
    } catch {
      showModal('Failed to delete review.');
    }
  };


  //star rating
  const renderStars = (value, onPress) => (
    <View style={styles.starsContainer}>
      {[1,2,3,4,5].map(i => (
        <TouchableOpacity key={i} onPress={() => onPress && onPress(i)} disabled={!onPress}>
          <Ionicons name={i <= value ? 'star' : 'star-outline'} size={20} color="#1E3A8A" />
        </TouchableOpacity>
      ))}
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#1E40AF" style={{marginTop:50}} />;

  const userReview = reviews.find(r => r.userId === user?.id);

  return (
    <View style={styles.container}>
      {/* open form */}
      {user && !showForm && !userReview && (
        <TouchableOpacity style={styles.addReviewButton} onPress={() => setShowForm(true)}>
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.addReviewButtonText}>Write a Review</Text>
        </TouchableOpacity>
      )}

      {/* FORM */}
      {showForm && (
        <View style={styles.reviewForm}>
          <TextInput
            style={styles.commentInput}
            placeholder="Share your experience..."
            value={comment}
            onChangeText={setComment}
            multiline
          />
          {renderStars(rating, setRating)}
          <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowForm(false)}>
            <Text style={{color:'gray', marginTop:5}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* قائمة الريفيوز */}
      <ScrollView>
        {reviews.length === 0 && <Text style={{marginTop:20, textAlign:'center'}}>No reviews yet</Text>}
        {reviews.map(r => (
          <View key={r.id} style={styles.reviewCard}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image source={{uri:r.userImage}} style={styles.userImage} />
                <View style={{marginLeft:10}}>
                  <Text>{r.userName}</Text>
                  <Text style={{fontSize:12, color:'gray'}}>{r.userId===user?.id?'You':'Student'}</Text>
                </View>
              </View>
              {r.userId === user?.id && (
                <TouchableOpacity onPress={() => { setReviewToDelete(r); setDeleteConfirmVisible(true); }}>
                  <Ionicons name="trash-outline" size={20} color="#DC2626" />
                </TouchableOpacity>
              )}
            </View>
            <Text>{r.comment}</Text>
            {r.createdAt && <Text style={{fontSize:12,color:'gray'}}>{new Date(r.createdAt).toLocaleDateString()}</Text>}
          </View>
        ))}
      </ScrollView>

      {/* مودال الرسائل */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)'}}>
          <View style={{backgroundColor:'white', padding:20, borderRadius:10, width:'80%'}}>
            <Text>{modalMessage}</Text>
            <Pressable onPress={() => setModalVisible(false)} style={{alignSelf:'flex-end', marginTop:10}}>
              <Text style={{color:'#1E40AF', fontWeight:'bold'}}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* مودال تأكيد الحذف */}
      <Modal transparent visible={deleteConfirmVisible} animationType="fade">
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)'}}>
          <View style={{backgroundColor:'white', padding:20, borderRadius:10, width:'80%'}}>
            <Text style={{fontWeight:'bold', marginBottom:10}}>Confirm Delete</Text>
            <Text>Are you sure you want to delete this review?</Text>
            <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:15}}>
              <Pressable onPress={() => setDeleteConfirmVisible(false)} style={{marginRight:10}}>
                <Text>Cancel</Text>
              </Pressable>
              <Pressable onPress={confirmDelete} style={{backgroundColor:'#DC2626', paddingHorizontal:12, paddingVertical:6, borderRadius:5}}>
                <Text style={{color:'white'}}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
