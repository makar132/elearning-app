import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DeleteConfirmModal, SuccessModal } from "../../components/CourseDetails/Modals";
import { reviewService } from "../../services/reviewService";
import { useAuth } from "../../context/AuthContext";
import { reviewsTabStyles as styles } from "../../utils/courseDetailsStyles";
export default function ReviewsTab({ courseId }) {
 const { user } = useAuth();
const [reviews, setReviews] = useState([]); 
const [comment, setComment] = useState(""); 
const [rating, setRating] = useState(5); 

const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false); // delete -modal visible
const [reviewToDelete, setReviewToDelete] = useState(null); // selected review delete

const [successVisible, setSuccessVisible] = useState(false); // success modal 
const [successMessage, setSuccessMessage] = useState(""); // success message 

useEffect(() => {
  const load = async () => {
    try {
      const data = await reviewService.getCourseReviews(courseId); 
      setReviews(data); 
    } catch {
      console.error("Failed to load reviews."); 
    }
  };
  load(); 
}, [courseId]);

const showSuccess = (message) => { setSuccessMessage(message); setSuccessVisible(true); }; 
const submitReview = async () => {
  if (!user || !comment.trim()) return; 
  const newReview = {
    userId: user.id, 
    userName: user.name || user.email.split("@")[0], 
    userImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email.split("@")[0])}&background=1e40af&color=fff`, 
    rating, 
    comment: comment.trim(), 
    createdAt: new Date(), 
  };
  try {
    const id = await reviewService.addReview(courseId, newReview); // add review 
    setReviews([{ ...newReview, id }, ...reviews]); // update reviews 
    setComment("");
     setRating(5); 
    showSuccess("Review submitted!"); 
  } catch { console.error("Failed to submit review."); } 
};

const confirmDelete = async () => {

  if (!reviewToDelete) return; //  select review
  try {
    await reviewService.deleteReview(courseId, reviewToDelete.id); // delete review 
    setReviews(reviews.filter(r => r.id !== reviewToDelete.id)); // remove review state
    setDeleteConfirmVisible(false); 
    showSuccess("Review deleted."); 
  } catch { console.error("Failed to delete review."); } // log delete error
};

const renderStars = (value, onPress) => (
  <View style={styles.starsContainer}>
    {[1,2,3,4,5].map(i => (
      <TouchableOpacity key={i} onPress={() => onPress && onPress(i)} disabled={!onPress}> 
        <Ionicons name={i<=value?"star":"star-outline"} size={20} color="#1E3A8A" /> 
      </TouchableOpacity>
    ))}
  </View>
);

const userReview = reviews.find(r => r.userId === user?.id); // find user review

return (
  <View style={styles.container}>
    {user && !userReview && (
      <View style={styles.reviewForm}>
        <TextInput
          style={styles.commentInput}
          placeholder="Share your experience..."
          value={comment}
          onChangeText={setComment} // update comment state
          multiline
        />
        {renderStars(rating, setRating)} 
        <TouchableOpacity style={styles.submitButton} onPress={submitReview}> 
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    )}

    <ScrollView>
      {reviews.length===0 ? (
        <Text style={{marginTop:20,textAlign:"center"}}>No reviews yet</Text> // no reviews message
      ) : reviews.map(r => (
        <View key={r.id} style={styles.reviewCard}> 
          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <Image source={{uri:r.userImage}} style={styles.userImage}/> 
              <View style={{marginLeft:10}}><Text>{r.userName}</Text></View> 
            </View>
            {r.userId===user?.id && (
              
              <TouchableOpacity onPress={() => { setReviewToDelete(r); setDeleteConfirmVisible(true); }}> 
                <Ionicons name="trash-outline" size={20} color="#DC2626"/> 
              </TouchableOpacity>
            )}
          </View>
          <Text>{r.comment}</Text> 
          {r.createdAt && <Text style={{fontSize:12,color:"gray"}}>{new Date(r.createdAt).toLocaleDateString()}</Text>} 
        </View>
      ))}
    </ScrollView>

    <DeleteConfirmModal visible={deleteConfirmVisible} onCancel={() => setDeleteConfirmVisible(false)} onDelete={confirmDelete}/> 
    <SuccessModal visible={successVisible} message={successMessage} onClose={() => setSuccessVisible(false)}/> 
  </View>
);  

};
